import { ClaimRecord } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import _ from "lodash";

/**
 * Get all claim records with filtering and pagination
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
}

/**
 * Get filter options for dropdowns
 */
export async function getFilterOptions() {
  // Get all unique LOC values
  const locOptions = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    where: { LOC: { not: null } },
  });
  
  // Get all unique payer names
  const payerOptions = await prisma.claimRecord.groupBy({
    by: ['payerName'],
    where: { payerName: { not: null } },
  });
  
  // Get all unique patient states
  const patientStateOptions = await prisma.claimRecord.groupBy({
    by: ['patientState'],
    where: { patientState: { not: null } },
  });
  
  // Get all unique insurance states
  const insuranceStateOptions = await prisma.claimRecord.groupBy({
    by: ['primaryInsState'],
    where: { primaryInsState: { not: null } },
  });

  return {
    loc: locOptions.map(option => option.LOC).filter(Boolean) as string[],
    payerName: payerOptions.map(option => option.payerName).filter(Boolean) as string[],
    patientState: patientStateOptions.map(option => option.patientState).filter(Boolean) as string[],
    insuranceState: insuranceStateOptions.map(option => option.primaryInsState).filter(Boolean) as string[],
  };
}

/**
 * Get summary statistics for the dashboard
 */
export async function getDashboardStats() {
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
  
  // Get metrics by LOC - this now comes from the CalculatedMetrics table
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

  // If we have no metrics, return empty placeholder values
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
}

import { ClaimRecord } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import _ from "lodash";

/**
 * Get all claim records for client-side filtering and visualization
 */
export async function getAllClaimData() {
  try {
    const records = await prisma.claimRecord.findMany({
      select: {
        id: true,
        LOC: true,
        payerName: true,
        payerClass: true,
        practiceName: true,
        patientState: true,
        primaryInsState: true,
        chargeFromDate: true,
        chargeToDate: true,
        paymentEntered: true,
        paymentTotalPaid: true,
        paymentAllowedAmount: true,
        claimPrimaryMemberID: true,
        // Removed fields: admitDate, dischargeDate, admitType, dischargeStatus
      }
    });
    
    return records.map(record => ({
      id: record.id,
      levelOfCare: record.LOC,
      payer: record.payerName,
      payerClass: record.payerClass,
      provider: record.practiceName,
      patientState: record.patientState,
      stateTreatedAt: record.primaryInsState,
      serviceDate: record.chargeFromDate ? record.chargeFromDate.toISOString() : null,
      // Map paymentEntered as paymentDate for compatibility with the UI.
      paymentDate: record.paymentEntered ? record.paymentEntered.toISOString() : null,
      paidAmount: record.paymentTotalPaid?.toString() || "0",
      allowedAmount: record.paymentAllowedAmount?.toString() || "0",
      patientId: record.claimPrimaryMemberID,
    }));
  } catch (error) {
    console.error("Error fetching all claim data:", error);
    return [];
  }
}
