import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function populateProjectAllowedAmount() {
  try {
    // First, clear existing data
    await prisma.projectAllowedAmount.deleteMany({});
    console.log('Cleared existing ProjectAllowedAmount data');
      
    // Get unique payer groups from ClaimRecord
    const payerGroups = await prisma.claimRecord.findMany({
      select: {
        payerGroup: true,
      },
      where: {
        payerGroup: {
          not: null
        }
      },
      distinct: ['payerGroup']
    });
    
    console.log(`Found ${payerGroups.length} distinct payer groups`);
    
    // Get metrics for each LOC
    const locMetrics = await prisma.calculatedMetrics.findMany({
      select: {
        LOC: true,
        countOfObservation: true,
        averageAllowedAmount: true,
        maxAllowedAmount: true,
        medianAllowedAmount: true,
        modeAllowedAmount: true
      }
    });
    
    // For each payer group, create entries for each LOC
    const createdRecords = [];
    
    for (const { payerGroup } of payerGroups) {
      // Skip null or empty payer groups
      if (!payerGroup || payerGroup.trim() === '') continue;
      
      console.log(`Processing payer group: ${payerGroup}`);
      
      // For each LOC, create a record for this payer group
      for (const metric of locMetrics) {
        try {
          // Get count of claims for this payer group and LOC
          const claimCount = await prisma.claimRecord.count({
            where: {
              payerGroup: payerGroup,
              LOC: metric.LOC
            }
          });
          
          // Only create records if there are claims for this combination
          if (claimCount > 0) {
            const record = await prisma.projectAllowedAmount.create({
              data: {
                payerGroup: payerGroup, // Changed from payerClass to payerGroup
                LOC: metric.LOC,
                countOfObservation: claimCount,
                averageAllowedAmount: metric.averageAllowedAmount,
                maxAllowedAmount: metric.maxAllowedAmount,
                medianAllowedAmount: metric.medianAllowedAmount,
                modeAllowedAmount: metric.modeAllowedAmount
              }
            });
            
            createdRecords.push(record);
            console.log(`Created record for payerGroup=${payerGroup}, LOC=${metric.LOC}`);
          }
        } catch (error) {
          console.error(`Error creating record for payerGroup=${payerGroup}, LOC=${metric.LOC}:`, error);
        }
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