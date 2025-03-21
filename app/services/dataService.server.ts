import { ClaimRecord } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import _ from "lodash";

/**
 * Get filter options for dashboard dropdowns
 * Returns field names matching the frontend component expectations
 */
export async function getFilterOptions() {
  try {
    // Get all unique LOC values
    const locOptions = await prisma.claimRecord.findMany({
      select: { LOC: true },
      where: { LOC: { not: null } },
      distinct: ['LOC'],
    });

    // Get all unique payer names
    const payerOptions = await prisma.claimRecord.findMany({
      select: { payerName: true },
      where: { payerName: { not: null } },
      distinct: ['payerName'],
    });

    // Get all unique payer classes (payerGroup)
    const payerClassOptions = await prisma.claimRecord.findMany({
      select: { payerGroup: true },
      where: { payerGroup: { not: null } },
      distinct: ['payerGroup'],
    });

    // Get all unique insurance states
    const stateOptions = await prisma.claimRecord.findMany({
      select: { primaryInsState: true },
      where: { primaryInsState: { not: null } },
      distinct: ['primaryInsState'],
    });

    // Get unique service years
    const serviceYearOptions = await prisma.claimRecord.findMany({
      select: { serviceYear: true },
      where: { serviceYear: { not: null } },
      distinct: ['serviceYear'],
    });

    // Get unique payment years
    const paymentYearOptions = await prisma.claimRecord.findMany({
      select: { paymentReceivedYear: true },
      where: { paymentReceivedYear: { not: null } },
      distinct: ['paymentReceivedYear'],
    });

    // Map database field names to frontend field names
    return {
      levelOfCare: locOptions.map(option => option.LOC).filter(Boolean).sort(),
      payer: payerOptions.map(option => option.payerName).filter(Boolean).sort(),
      payerClass: payerClassOptions.map(option => option.payerGroup).filter(Boolean).sort(),
      stateTreatedAt: stateOptions.map(option => option.primaryInsState).filter(Boolean).sort(),
      serviceYears: serviceYearOptions.map(option => option.serviceYear).filter(Boolean).sort((a, b) => b - a),
      paymentYears: paymentYearOptions.map(option => option.paymentReceivedYear).filter(Boolean).sort((a, b) => b - a),
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    // Return empty arrays as fallback
    return {
      levelOfCare: [],
      payer: [],
      payerClass: [],
      stateTreatedAt: [],
      serviceYears: [],
      paymentYears: [],
    };
  }
}

/**
 * Get all claim records for client-side filtering and visualization
 * Maps database field names to frontend field names
 */
export async function getAllClaimData() {
  try {
    const records = await prisma.claimRecord.findMany({
      select: {
        id: true,
        LOC: true,
        payerName: true,
        payerGroup: true,
        practiceName: true,
        patientState: true,
        primaryInsState: true,
        chargeFromDate: true,
        chargeToDate: true,
        paymentReceived: true,
        paymentEntered: true,
        paymentTotalPaid: true,
        paymentAllowedAmount: true,
        claimPrimaryMemberID: true,
        serviceYear: true,
        paymentReceivedYear: true,
      }
    });
    
    // Map database field names to frontend field names
    return records.map(record => ({
      id: record.id,
      levelOfCare: record.LOC,
      payer: record.payerName,
      payerClass: record.payerGroup,
      provider: record.practiceName,
      patientState: record.patientState,
      stateTreatedAt: record.primaryInsState,
      serviceDate: record.chargeFromDate ? record.chargeFromDate.toISOString() : null,
      paymentDate: record.paymentReceived ? record.paymentReceived.toISOString() : null,
      paidAmount: record.paymentTotalPaid?.toString() || "0",
      allowedAmount: record.paymentAllowedAmount?.toString() || "0",
      patientId: record.claimPrimaryMemberID,
      // Include the year fields directly to avoid extracting in the frontend
      serviceYear: record.serviceYear,
      paymentYear: record.paymentReceivedYear,
    }));
  } catch (error) {
    console.error("Error fetching all claim data:", error);
    return [];
  }
}

/**
 * Get summary statistics for the dashboard
 */
export async function getDashboardStats() {
  try {
    // Get total record count
    const totalRecords = await prisma.claimRecord.count();
    
    // Get total unique patients (approximated by unique member IDs)
    const uniquePatients = await prisma.claimRecord.groupBy({
      by: ['claimPrimaryMemberID'],
      where: { claimPrimaryMemberID: { not: null } },
    });
    
    // Get total unique payers
    const uniquePayers = await prisma.claimRecord.groupBy({
      by: ['payerName'],
      where: { payerName: { not: null } },
    });
    
    // Get total amount of payments
    const payments = await prisma.claimRecord.aggregate({
      _sum: {
        paymentTotalPaid: true,
      },
      where: {
        paymentTotalPaid: { not: null },
      },
    });
    
    // Get total allowed amounts
    const allowed = await prisma.claimRecord.aggregate({
      _sum: {
        paymentAllowedAmount: true,
      },
      where: {
        paymentAllowedAmount: { not: null },
      },
    });
    
    // Get breakdown by LOC
    const locBreakdown = await prisma.claimRecord.groupBy({
      by: ['LOC'],
      _count: {
        id: true,
      },
      _sum: {
        paymentAllowedAmount: true,
        paymentTotalPaid: true,
      },
      where: { LOC: { not: null } },
    });
    
    // Get metrics by LOC from the CalculatedMetrics table
    const locMetrics = await prisma.calculatedMetrics.findMany({
      select: {
        LOC: true,
        countOfObservation: true,
        averageAllowedAmount: true,
        minAllowedAmount: true,
        maxAllowedAmount: true,
        medianAllowedAmount: true,
        modeAllowedAmount: true,
      },
    });

    // If we have no metrics, generate placeholder values from the raw data
    if (locMetrics.length === 0) {
      return {
        totalRecords,
        uniquePatients: uniquePatients.length,
        uniquePayers: uniquePayers.length,
        totalPayments: payments._sum.paymentTotalPaid || 0,
        totalAllowed: allowed._sum.paymentAllowedAmount || 0,
        locBreakdown,
        locMetrics: locBreakdown.map(item => ({
          LOC: item.LOC || "",
          countOfObservation: item._count.id,
          averageAllowedAmount: item._sum.paymentAllowedAmount ? item._sum.paymentAllowedAmount / item._count.id : 0,
          minAllowedAmount: 0,
          maxAllowedAmount: 0,
          medianAllowedAmount: 0,
          modeAllowedAmount: 0,
        })),
      };
    }

    return {
      totalRecords,
      uniquePatients: uniquePatients.length,
      uniquePayers: uniquePayers.length,
      totalPayments: payments._sum.paymentTotalPaid || 0,
      totalAllowed: allowed._sum.paymentAllowedAmount || 0,
      locBreakdown,
      locMetrics,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalRecords: 0,
      uniquePatients: 0,
      uniquePayers: 0,
      totalPayments: 0,
      totalAllowed: 0,
      locBreakdown: [],
      locMetrics: [],
    };
  }
}

/**
 * Get claim records with filtering and pagination
 */
export async function getClaimRecords(options: {
  page?: number;
  pageSize?: number;
  search?: string;
  loc?: string;
  payerName?: string;
  patientState?: string;
  insuranceState?: string;
  fromDate?: string | Date;
  toDate?: string | Date;
}) {
  try {
    const {
      page = 1,
      pageSize = 50,
      search,
      loc,
      payerName,
      patientState,
      insuranceState,
      fromDate,
      toDate,
    } = options;

    // Calculate pagination values
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where clause
    const where: any = {};
    
    // Add filters if they are provided
    if (search) {
      where.OR = [
        { LOC: { contains: search, mode: "insensitive" } },
        { practiceName: { contains: search, mode: "insensitive" } },
        { payerName: { contains: search, mode: "insensitive" } },
        { patientState: { contains: search, mode: "insensitive" } },
        { primaryInsState: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (loc) {
      where.LOC = { equals: loc, mode: "insensitive" };
    }
    
    if (payerName) {
      where.payerName = { contains: payerName, mode: "insensitive" };
    }
    
    if (patientState) {
      where.patientState = { equals: patientState, mode: "insensitive" };
    }
    
    if (insuranceState) {
      where.primaryInsState = { equals: insuranceState, mode: "insensitive" };
    }
    
    // Date range filters
    if (fromDate) {
      where.chargeFromDate = { 
        ...(where.chargeFromDate || {}),
        gte: new Date(fromDate)
      };
    }
    
    if (toDate) {
      where.chargeFromDate = { 
        ...(where.chargeFromDate || {}),
        lte: new Date(toDate)
      };
    }

    // Get records with pagination
    const records = await prisma.claimRecord.findMany({
      where,
      skip,
      take,
      orderBy: {
        id: "desc", // Most recent records first
      },
    });

    // Get total count for pagination
    const total = await prisma.claimRecord.count({ where });

    return {
      records,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching claim records:", error);
    return {
      records: [],
      pagination: {
        page: 1,
        pageSize: 50,
        total: 0,
        totalPages: 0,
      },
    };
  }
}