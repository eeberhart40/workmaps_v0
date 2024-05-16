/*
 * Run: tsx fixtures/jobTestFixtures.ts
 *
 * This will delete/drop all the records in the database and import the Test Fixtures
 */
import dotenv from "dotenv";
dotenv.config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createJobs() {
  // Reset the Job table by deleting all existing records
  await prisma.job.deleteMany({});

  const job = await prisma.job.createMany({
    data: [
      {
        title: "Line Shift Manager",
        employer_title: "Chipotle",
        payMin: 22.0,
        payMax: 14.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attl2hAfwHaYTWLGi/120x120",
      },
      {
        title: "Line Cook",
        employer_title: "Chipotle",
        payMin: 18.0,
        payMax: 14.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attl2hAfwHaYTWLGi/120x120",
      },
      {
        title: "Customer Service Rep.",
        employer_title: "Best Buy",
        payMin: 15.0,
        payMax: 12.5,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120",
      },
      {
        title: "Customer Service Rep.",
        employer_title: "Best Buy",
        payMin: 15.0,
        payMax: 12.5,
        cpa: 1.25,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120",
      },
      {
        title: "Cashier",
        employer_title: "Best Buy",
        payMin: 14.0,
        payMax: 10.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120",
      },
      {
        title: "Floor Associate",
        employer_title: "Best Buy",
        payMin: 12.0,
        payMax: 10.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attlt19ZKf0WLp9xW/120x120",
      },
      {
        title: "Cashier",
        employer_title: "Panera Bread",
        payMin: 14.0,
        payMax: 10.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attI4WSfyeLLAzox7/120x120",
      },
      {
        title: "Sandwhich Artist",
        employer_title: "Jersey Mikes",
        payMin: 18.75,
        payMax: 14.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120",
      },
      {
        title: "Shift Lead",
        employer_title: "Jersey Mikes",
        payMin: 20.0,
        payMax: 18.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120",
      },
      {
        title: "Part-Time Closer",
        employer_title: "Jersey Mikes",
        payMin: 14.0,
        payMax: 12.0,
        cpa: 0.2,
        cpc: 0.8,
        verified: false,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/atta2FV4iKNso35ox/120x120",
      },
      {
        title: "Barista",
        employer_title: "Starbucks",
        payMin: 25.0,
        payMax: 20.0,
        cpa: 5.25,
        cpc: 1.8,
        verified: true,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120",
      },
      {
        title: "Opening Lead",
        employer_title: "Starbucks",
        payMin: 35.0,
        payMax: 24.0,
        cpa: 9.25,
        cpc: 2.8,
        verified: true,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120",
      },
      {
        title: "Drink Artist",
        employer_title: "Starbucks",
        payMin: 19.0,
        payMax: 10.0,
        cpa: 2.25,
        cpc: 1.0,
        verified: false,
        urgent_hiring: true,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attSRYTp3oop9uFZf/120x120",
      },
      {
        title: "Cashier",
        employer_title: "Chick-fil-A",
        payMin: 16.0,
        payMax: 12.0,
        cpa: 3.1,
        cpc: 0.8,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attiHZ14EBqkIxFXE/120x120",
      },
      {
        title: "Floor Associate",
        employer_title: "Chicos",
        payMin: 14.0,
        payMax: 12.0,
        cpc: 0.3,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attpMw4bq8nwvCjMg/120x120",
      },
      {
        title: "Stockroom Manager",
        employer_title: "Chicos",
        payMin: 20.0,
        payMax: 18.0,
        cpc: 0.9,
        verified: true,
        urgent_hiring: false,
        employer_logo_url:
          "https://imagedelivery.net/0GdndQHAiaWREXFh0K7QTg/logos/attpMw4bq8nwvCjMg/120x120",
      },
    ],
  });
}

createJobs()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
