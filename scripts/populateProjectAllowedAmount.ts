// scripts/populateProjectAllowedAmount.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * This script populates the ProjectAllowedAmount table with data from CalculatedMetrics
 */
async function populateProjectAllowedAmount() {
  try {
    console.log('Starting to populate ProjectAllowedAmount table...');

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
  } catch (error) {
    console.error('Error populating ProjectAllowedAmount table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
populateProjectAllowedAmount()
  .then(() => console.log('Script completed successfully'))
  .catch((error) => console.error('Script failed:', error));