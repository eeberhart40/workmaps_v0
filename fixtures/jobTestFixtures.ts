/*
 * Run: tsx fixtures/jobTestFixtures.ts 
 * 
 * This will delete/drop all the records in the database and import the Test Fixtures
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createJobs() {
  // Reset the Job table by deleting all existing records
  await prisma.job.deleteMany({});


  const job = await prisma.job.createMany({
    data: [
      {
        title: 'Line Shift Manager',
        employer_title: 'Chipotle',
        payMin: 22.00,
        payMax: 14.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attl2hAfwHaYTWLGi/120x120"
      },
      {
        title: 'Line Cook',
        employer_title: 'Chipotle',
        payMin: 18.00,
        payMax: 14.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attl2hAfwHaYTWLGi/120x120"
      },
      {
        title: 'Customer Service Rep.',
        employer_title: 'Best Buy',
        payMin: 15.00,
        payMax: 12.50,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120"
      },
      {
        title: 'Customer Service Rep.',
        employer_title: 'Best Buy',
        payMin: 15.00,
        payMax: 12.50,
        cpa: 1.25,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120"
      },
      {
        title: 'Cashier',
        employer_title: 'Best Buy',
        payMin: 14.00,
        payMax: 10.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120"
      },
      {
        title: 'Floor Associate',
        employer_title: 'Best Buy',
        payMin: 12.00,
        payMax: 10.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120"
      },
      {
        title: 'Cashier',
        employer_title: 'Panera Bread',
        payMin: 14.00,
        payMax: 10.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attI4WSfyeLLAzox7/120x120"
      },
      {
        title: 'Sandwhich Artist',
        employer_title: 'Jersey Mikes',
        payMin: 18.75,
        payMax: 14.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120"
      },
      {
        title: 'Shift Lead',
        employer_title: 'Jersey Mikes',
        payMin: 20.00,
        payMax: 18.00,
        cpa: .20,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120"
      },
      {
        title: 'Part-Time Closer',
        employer_title: 'Jersey Mikes',
        payMin: 14.00,
        payMax: 12.00,
        cpa: .20,
        cpc: .80,
        verified: false,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120"
      },
      {
        title: 'Barista',
        employer_title: 'Starbucks',
        payMin: 25.00,
        payMax: 20.00,
        cpa: 5.25,
        cpc: 1.80,
        verified: true,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120"
      },
      {
        title: 'Opening Lead',
        employer_title: 'Starbucks',
        payMin: 35.00,
        payMax: 24.00,
        cpa: 9.25,
        cpc: 2.80,
        verified: true,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120"
      },
      {
        title: 'Drink Artist',
        employer_title: 'Starbucks',
        payMin: 19.00,
        payMax: 10.00,
        cpa: 2.25,
        cpc: 1.00,
        verified: false,
        urgent_hiring: true,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120"
      },
      {
        title: 'Cashier',
        employer_title: 'Chick-fil-A',
        payMin: 16.00,
        payMax: 12.00,
        cpa: 3.10,
        cpc: .80,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attiHZ14EBqkIxFXE/120x120"
      },
      {
        title: 'Floor Associate',
        employer_title: 'Chicos',
        payMin: 14.00,
        payMax: 12.00,
        cpc: .30,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attpMw4bq8nwvCjMg/120x120"
      },
      {
        title: 'Stockroom Manager',
        employer_title: 'Chicos',
        payMin: 20.00,
        payMax: 18.00,
        cpc: .90,
        verified: true,
        urgent_hiring: false,
        employer_logo_url: "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attpMw4bq8nwvCjMg/120x120"
      }
    ]
  });
}

createJobs().catch((e) => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});