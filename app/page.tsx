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
  const response = await fetch("http://localhost:3000/api/jobs");
  const data = await response.json();
  return data.data.filter((job: { verified: boolean }) => job.verified);
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
