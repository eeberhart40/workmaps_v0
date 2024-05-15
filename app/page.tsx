import { EmployerCardProps } from "@/components/EmployerCard";
import type { Job } from "./types/Job";
import { EmployerJobList } from "../components/EmployerJobList";

const groupJobsByEmployer = (jobs: Job[]): EmployerCardProps[] => {
  const employerMap: { [key: string]: EmployerCardProps } = {};

  jobs.forEach((job) => {
    const {
      employer_title,
      employer_logo_url,
      urgent_hiring,
      id,
      title,
      payMin,
      payMax,
    } = job;

    if (!employerMap[employer_title]) {
      employerMap[employer_title] = {
        employer_title,
        employer_logo_url,
        urgent_hiring,
        jobs: [],
      };
    }

    employerMap[employer_title].jobs.push({ id, title, payMin, payMax });
  });

  return Object.values(employerMap);
};

const fetchJobs: () => Promise<Job[]> = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Check if running in CI and return mock data if so
  if (process.env.CI) {
    console.log("Running in CI, using mock data");
    return [
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
    ];
  }

  try {
    const response = await fetch(`${siteUrl}/api/jobs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || "Failed to fetch jobs");
    }
    return data.result;
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // Fallback to an empty array
  }
};

export default async function Home() {
  const jobs = await fetchJobs();
  const groupedJobs = groupJobsByEmployer(jobs);

  const [totalJobs, totalEmployers] = groupedJobs.reduce(
    (acc, group) => {
      acc[0] += group.jobs.length;
      acc[1] += 1;
      return acc;
    },
    [0, 0]
  );

  return (
    <EmployerJobList
      groupedJobs={groupedJobs}
      totalJobs={totalJobs}
      totalEmployers={totalEmployers}
    />
  );
}
