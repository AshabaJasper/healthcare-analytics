import { ClaimRecord, CalculatedMetrics } from "@prisma/client";
import { format } from "date-fns";

/**
 * Extract year from a date
 */
export function extractYear(date: Date | null | undefined): number | null {
  if (!date) return null;
  return date.getFullYear();
}

/**
 * Map raw Excel data to ClaimRecord structure
 */
export function mapExcelToClaimRecord(row: any): Partial<ClaimRecord> {
  // Convert Excel date number to JS date if it's a number
  const convertExcelDate = (value: any) => {
    if (!value) return null;
    
    // If it's already a Date object
    if (value instanceof Date) return value;
    
    // If it's a number (Excel date)
    if (typeof value === 'number') {
      // Excel dates are days since 1900-01-01, with a leap year bug
      // Excel thinks 1900 was a leap year, but it wasn't, so we need to adjust
      const excelEpoch = new Date(1899, 11, 30); // Dec 30, 1899
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      return new Date(excelEpoch.getTime() + value * millisecondsPerDay);
    }
    
    // If it's a string (date string)
    return new Date(value);
  };
  
  // Handle dates
  const paymentReceived = convertExcelDate(row["Payment Received"]);
  const paymentEntered = convertExcelDate(row["Payment Entered"]);
  const chargeFromDate = convertExcelDate(row["Charge From Date"]);
  const chargeToDate = convertExcelDate(row["Charge To Date"]);

  // Extract years for filtering
  const serviceYear = chargeFromDate ? chargeFromDate.getFullYear() : null;
  const paymentReceivedYear = paymentReceived ? paymentReceived.getFullYear() : null;
  
  // Main mapping
  return {
    practiceName: row["Practice Name"] || null,
    chargeCPTCode: row["Charge CPT Code"] || null,
    revenueCode: row["Revenue Code"] ? parseInt(row["Revenue Code"]) : null,
    LOC: row["LOC"] || null,
    chargeAmount: row["Charge Amount"] ? parseFloat(String(row["Charge Amount"]).replace(/[$,\s]/g, '')) : null,
    paymentAllowedAmount: row["Payment Allowed Amount"] ? parseFloat(String(row["Payment Allowed Amount"]).replace(/[$,\s]/g, '')) : null,
    primaryGroupNum: row["Primary Group #"] ? String(row["Primary Group #"]) : null,
    claimPrimaryMemberID: row["Primary Payer Member ID"] ? String(row["Primary Payer Member ID"]) : null, // Convert to string
    payerName: row["Payer Name"] || null,
    payerGroup: row["Payer Group"] || null,
    paymentTotalPaid: row["Payment Total Paid"] ? parseFloat(String(row["Payment Total Paid"]).replace(/[$,\s]/g, '')) : null,
    paymentReceived,
    paymentEntered,
    chargeFromDate,
    chargeToDate,
    primaryInsZip: row["Primary Ins Zip"] ? String(row["Primary Ins Zip"]) : null,
    primaryInsCity: row["Primary Ins City"] || null,
    primaryInsState: row["Primary Ins State"] || null,
    primaryInsAddr1: row["Primary Ins Addr 1"] || null,
    patientZip: row["Patient Zip"] ? String(row["Patient Zip"]) : null,
    patientCity: row["Patient City"] || null,
    patientState: row["Patient State"] || null,
    patientAddress1: row["Patient Address 1"] || null,
    
    // Derived fields
    payerClass: row["Payer Group"] || null, // Initially set to Payer Group, can be refined later
    employerName: row["Primary Group #"] ? String(row["Primary Group #"]) : null, // Initially use Primary Group, can be refined later
    policyHolderState: row["Primary Ins State"] || null, // Initially use Primary Ins State
    
    // Derived temporal fields
    serviceYear,
    paymentReceivedYear,
  };
}

/**
 * Format date for display
 */
export function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return format(date, 'MM/dd/yyyy');
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number | null | undefined, options?: Intl.NumberFormatOptions): string {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    ...options
  }).format(amount);
}

/**
 * Calculate metrics from ClaimRecord data
 */
export function calculateMetrics(
  records: ClaimRecord[],
  filters: {
    LOC?: string;
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
): Partial<CalculatedMetrics> {
  // Filter records based on provided filters
  let filteredRecords = records;
  
  if (filters.LOC) {
    filteredRecords = filteredRecords.filter(r => r.LOC === filters.LOC);
  }
  
  if (filters.payerName) {
    filteredRecords = filteredRecords.filter(r => r.payerName === filters.payerName);
  }
  
  if (filters.payerClass) {
    filteredRecords = filteredRecords.filter(r => r.payerClass === filters.payerClass);
  }
  
  if (filters.stateTreatedAt) {
    filteredRecords = filteredRecords.filter(r => 
      r.primaryInsState === filters.stateTreatedAt || r.patientState === filters.stateTreatedAt
    );
  }
  
  if (filters.dateOfServiceYear) {
    filteredRecords = filteredRecords.filter(r => r.serviceYear === filters.dateOfServiceYear);
  }
  
  if (filters.paymentReceivedYear) {
    filteredRecords = filteredRecords.filter(r => r.paymentReceivedYear === filters.paymentReceivedYear);
  }
  
  // If no records after filtering, return empty metrics
  if (filteredRecords.length === 0) {
    return {
      LOC: filters.LOC || '',
      countOfObservation: 0,
      averageAllowedAmount: 0,
      minAllowedAmount: 0,
      maxAllowedAmount: 0,
      medianAllowedAmount: 0,
      modeAllowedAmount: 0,
      ...filters
    };
  }
  
  // Extract allowed amounts for calculations
  const allowedAmounts = filteredRecords
    .map(r => r.paymentAllowedAmount)
    .filter((amount): amount is number => amount !== null && amount !== undefined);
  
  // Calculate metrics
  const count = filteredRecords.length;
  const average = allowedAmounts.length > 0 
    ? allowedAmounts.reduce((sum, amount) => sum + amount, 0) / allowedAmounts.length 
    : 0;
  
  const min = allowedAmounts.length > 0 ? Math.min(...allowedAmounts) : 0;
  const max = allowedAmounts.length > 0 ? Math.max(...allowedAmounts) : 0;
  
  // Calculate median
  const sortedAmounts = [...allowedAmounts].sort((a, b) => a - b);
  const median = sortedAmounts.length > 0
    ? sortedAmounts.length % 2 === 0
      ? (sortedAmounts[sortedAmounts.length / 2 - 1] + sortedAmounts[sortedAmounts.length / 2]) / 2
      : sortedAmounts[Math.floor(sortedAmounts.length / 2)]
    : 0;
  
  // Calculate mode
  const frequencyMap: Record<number, number> = {};
  allowedAmounts.forEach(amount => {
    frequencyMap[amount] = (frequencyMap[amount] || 0) + 1;
  });
  
  let mode = 0;
  let maxFrequency = 0;
  
  Object.entries(frequencyMap).forEach(([amount, frequency]) => {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = parseFloat(amount);
    }
  });
  
  // Calculate total payment amount
  const totalPayment = filteredRecords
    .map(r => r.paymentTotalPaid)
    .filter((amount): amount is number => amount !== null && amount !== undefined)
    .reduce((sum, amount) => sum + amount, 0);
  
  // Return metrics object
  return {
    LOC: filters.LOC || '',
    countOfObservation: count,
    averageAllowedAmount: average,
    minAllowedAmount: min,
    maxAllowedAmount: max,
    medianAllowedAmount: median,
    modeAllowedAmount: mode,
    allowedAmount: average,
    insurancePayment: totalPayment / count,
    ...filters
  };
}

/**
 * Calculate projected revenue based on days and metrics
 */
export function calculateProjectedRevenue(
  metrics: Partial<CalculatedMetrics>, 
  days: number
): number {
  // Use average allowed amount for projection
  const averageAmount = metrics.averageAllowedAmount || 0;
  return averageAmount * days;
}