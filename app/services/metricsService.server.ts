import { ClaimRecord, CalculatedMetrics, Prisma } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import _ from "lodash";

/**
 * Calculate metrics for a specific LOC group and filters
 */
export async function calculateMetricsForLOC(
  LOC: string,
  filters: {
    stateTreatedAt?: string;
    payerName?: string;
    payerClass?: string;
    employerName?: string;
    prefix?: string;
    group?: string;
    policyHolderState?: string;
    dateOfServiceYear?: number;
    paymentReceivedYear?: number;
  }
): Promise<Partial<CalculatedMetrics>> {
  // Build the query conditions
  const where: Prisma.ClaimRecordWhereInput = { LOC };
  
  if (filters.stateTreatedAt) {
    where.OR = [
      { primaryInsState: filters.stateTreatedAt },
      { patientState: filters.stateTreatedAt }
    ];
  }
  
  if (filters.payerName) {
    where.payerName = filters.payerName;
  }
  
  if (filters.payerClass) {
    where.payerClass = filters.payerClass;
  }
  
  if (filters.employerName) {
    where.employerName = filters.employerName;
  }
  
  if (filters.prefix) {
    where.prefix = filters.prefix;
  }
  
  if (filters.group) {
    where.group = filters.group;
  }
  
  if (filters.policyHolderState) {
    where.policyHolderState = filters.policyHolderState;
  }
  
  if (filters.dateOfServiceYear) {
    where.serviceYear = filters.dateOfServiceYear;
  }
  
  if (filters.paymentReceivedYear) {
    where.paymentReceivedYear = filters.paymentReceivedYear;
  }
  
  // Get the records that match the criteria
  const records = await prisma.claimRecord.findMany({ where });
  
  // If no records found, return empty metrics
  if (records.length === 0) {
    return {
      LOC,
      countOfObservation: 0,
      averageAllowedAmount: 0,
      minAllowedAmount: 0,
      maxAllowedAmount: 0,
      medianAllowedAmount: 0,
      modeAllowedAmount: 0,
      ...filters
    };
  }
  
  // Extract payment allowed amounts for calculation
  const allowedAmounts = records
    .map(r => r.paymentAllowedAmount)
    .filter((amount): amount is number => amount !== null && amount !== undefined);
  
  // Calculate count and average
  const count = records.length;
  const average = allowedAmounts.length > 0
    ? _.meanBy(allowedAmounts, a => a)
    : 0;
  
  // Calculate min and max
  const min = allowedAmounts.length > 0 ? _.min(allowedAmounts) || 0 : 0;
  const max = allowedAmounts.length > 0 ? _.max(allowedAmounts) || 0 : 0;
  
  // Calculate median
  const sortedAmounts = [...allowedAmounts].sort((a, b) => a - b);
  const median = sortedAmounts.length > 0
    ? sortedAmounts.length % 2 === 0
      ? (sortedAmounts[sortedAmounts.length / 2 - 1] + sortedAmounts[sortedAmounts.length / 2]) / 2
      : sortedAmounts[Math.floor(sortedAmounts.length / 2)]
    : 0;
  
  // Calculate mode (the most frequent value)
  const frequencyMap = _.countBy(allowedAmounts);
  const mode = _.maxBy(Object.entries(frequencyMap), ([, count]) => count)?.[0] || "0";
  
  // Calculate total payment amount
  const totalPayment = _.sumBy(
    records,
    r => (r.paymentTotalPaid !== null && r.paymentTotalPaid !== undefined) ? r.paymentTotalPaid : 0
  );
  
  const avgPayment = count > 0 ? totalPayment / count : 0;
  
  // Prepare the metrics object
  return {
    LOC,
    countOfObservation: count,
    averageAllowedAmount: average,
    minAllowedAmount: min,
    maxAllowedAmount: max,
    medianAllowedAmount: median,
    modeAllowedAmount: parseFloat(mode),
    allowedAmount: average,
    insurancePayment: avgPayment,
    ...filters
  };
}

/**
 * Delete all existing metrics
 */
async function clearExistingMetrics() {
  try {
    await prisma.calculatedMetrics.deleteMany({});
    return true;
  } catch (error) {
    console.error("Error clearing metrics:", error);
    return false;
  }
}

/**
 * Calculate and store metrics for all LOC groups
 */
export async function calculateAndStoreAllMetrics(): Promise<number> {
  try {
    // First clear existing metrics to avoid duplicates
    await clearExistingMetrics();
    
    // Get all unique LOC values
    const locGroups = await prisma.claimRecord.groupBy({
      by: ['LOC'],
      where: {
        LOC: {
          not: null,
        },
      },
    });
    
    console.log(`Found ${locGroups.length} LOC groups`);
    
    let savedMetricsCount = 0;
    
    // Calculate metrics for each LOC
    for (const locGroup of locGroups) {
      if (!locGroup.LOC) {
        console.log("Skipping null LOC group");
        continue;
      }
      
      console.log(`Calculating metrics for LOC: ${locGroup.LOC}`);
      
      // Calculate metrics based solely on LOC
      const metrics = await calculateMetricsForLOC(locGroup.LOC, {});
      
      console.log(`Metrics for ${locGroup.LOC}:`, 
        `Count: ${metrics.countOfObservation}, ` +
        `Avg: ${metrics.averageAllowedAmount}, ` +
        `Min: ${metrics.minAllowedAmount}, ` +
        `Max: ${metrics.maxAllowedAmount}`
      );
      
      // Save the metrics to the database with empty strings for text fields and zeros for numbers
      // This approach avoids issues with the unique constraint and null values
      try {
        const savedMetrics = await prisma.calculatedMetrics.create({
          data: {
            LOC: locGroup.LOC,
            countOfObservation: metrics.countOfObservation || 0,
            averageAllowedAmount: metrics.averageAllowedAmount || 0,
            minAllowedAmount: metrics.minAllowedAmount || 0,
            maxAllowedAmount: metrics.maxAllowedAmount || 0,
            medianAllowedAmount: metrics.medianAllowedAmount || 0,
            modeAllowedAmount: metrics.modeAllowedAmount || 0,
            allowedAmount: metrics.allowedAmount || 0,
            insurancePayment: metrics.insurancePayment || 0,
            stateTreatedAt: "",  // Empty string instead of null
            payerName: "",
            payerClass: "",
            employerName: "",
            prefix: "",
            group: "",
            policyHolderState: "",
            dateOfServiceYear: 0,  // Zero instead of null
            paymentReceivedYear: 0,
          },
        });
        
        console.log(`Saved metrics for LOC: ${locGroup.LOC}, ID: ${savedMetrics.id}`);
        savedMetricsCount++;
      } catch (error) {
        console.error(`Error saving metrics for LOC ${locGroup.LOC}:`, error);
      }
    }
    
    console.log(`Successfully saved metrics for ${savedMetricsCount} LOC groups`);
    return savedMetricsCount;
  } catch (error) {
    console.error("Error in calculateAndStoreAllMetrics:", error);
    throw error;
  }
}

/**
 * Check if metrics need to be recalculated
 */
export async function checkMetricsStatus(): Promise<{ 
  needsCalculation: boolean, 
  locCount: number, 
  metricsCount: number 
}> {
  // Count LOC groups
  const locGroups = await prisma.claimRecord.groupBy({
    by: ['LOC'],
    where: {
      LOC: {
        not: null,
      },
    },
  });
  
  // Count metrics
  const metricsCount = await prisma.calculatedMetrics.count();
  
  // If we have LOC groups but no metrics, or fewer metrics than LOC groups,
  // we need to calculate metrics
  return {
    needsCalculation: locGroups.length > 0 && metricsCount < locGroups.length,
    locCount: locGroups.length,
    metricsCount,
  };
}