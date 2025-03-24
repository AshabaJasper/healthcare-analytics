import { prisma } from "~/lib/prisma.server";

/**
 * Refresh the ProjectAllowedAmount table with the latest data from CalculatedMetrics
 * This will be useful for periodic updates or triggered updates when metrics change
 */
export async function refreshProjectAllowedAmountTable() {
  try {
    console.log('Starting to refresh ProjectAllowedAmount table...');

    // First, clear existing data
    await prisma.projectAllowedAmount.deleteMany({});
    console.log('Cleared existing ProjectAllowedAmount data');

    // Get all calculated metrics data
    const metrics = await prisma.calculatedMetrics.findMany({
      select: {
        id: true,
        LOC: true,
        countOfObservation: true,
        averageAllowedAmount: true,
        minAllowedAmount: true,
        maxAllowedAmount: true,
        medianAllowedAmount: true,
        modeAllowedAmount: true,
        payerClass: true
      }
    });

    console.log(`Found ${metrics.length} metrics records to process`);

    // Process each metric and insert into ProjectAllowedAmount
    const createdRecords = [];
    
    for (const metric of metrics) {
      const payerClass = metric.payerClass || 'Unknown';
      
      try {
        const record = await prisma.projectAllowedAmount.create({
          data: {
            payerClass,
            LOC: metric.LOC,
            countOfObservation: metric.countOfObservation,
            averageAllowedAmount: metric.averageAllowedAmount,
            maxAllowedAmount: metric.maxAllowedAmount,
            medianAllowedAmount: metric.medianAllowedAmount,
            modeAllowedAmount: metric.modeAllowedAmount || 0
          }
        });
        
        createdRecords.push(record);
      } catch (error) {
        console.error(`Error creating record for payerClass=${payerClass}, LOC=${metric.LOC}:`, error);
      }
    }

    console.log(`Successfully created ${createdRecords.length} ProjectAllowedAmount records`);
    return {
      success: true,
      count: createdRecords.length
    };
  } catch (error) {
    console.error('Error refreshing ProjectAllowedAmount table:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get all records from the ProjectAllowedAmount table
 */
export async function getAllProjectAllowedAmounts() {
  try {
    return await prisma.projectAllowedAmount.findMany({
      orderBy: [
        { payerClass: 'asc' },
        { LOC: 'asc' }
      ]
    });
  } catch (error) {
    console.error('Error fetching ProjectAllowedAmount records:', error);
    return [];
  }
}

/**
 * Get ProjectAllowedAmount records for a specific payer class
 */
export async function getProjectAllowedAmountsByPayerClass(payerClass: string) {
  try {
    return await prisma.projectAllowedAmount.findMany({
      where: { payerClass },
      orderBy: { LOC: 'asc' }
    });
  } catch (error) {
    console.error(`Error fetching ProjectAllowedAmount records for payerClass=${payerClass}:`, error);
    return [];
  }
}