"use client";

import { useState, useEffect } from "react";
import { useWindowWidth } from "../app/hooks/useWindowWidth";
import { useDebounce } from "../app/hooks/useDebounce";
import { EmployerCard, EmployerCardProps } from "@/components/EmployerCard";

interface EmployerJobListProps {
  groupedJobs: EmployerCardProps[];
  totalJobs: number;
  totalEmployers: number;
}

export function EmployerJobList({
  groupedJobs,
  totalJobs,
  totalEmployers,
}: EmployerJobListProps) {
  const isMobile = useWindowWidth();
  const [totalMatchingJobs, setTotalMatchingJobs] = useState<number>(totalJobs);
  const [totalMatchingEmployers, setTotalMatchingEmployers] =
    useState<number>(totalEmployers);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filteredJobs, setFilteredJobs] =
    useState<EmployerCardProps[]>(groupedJobs);
  const [urgentlyHiring, setUrgentlyHiring] = useState<boolean>(false);

  useEffect(() => {
    let filtered = groupedJobs
      .map((group) => {
        const matchingJobs = group.jobs.filter(
          (job) =>
            job.title
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            group.employer_title
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
        );
        return {
          ...group,
          jobs: matchingJobs,
        };
      })
      .filter((group) => group.jobs.length > 0);

    if (urgentlyHiring) {
      filtered = filtered.filter((group) => group.urgent_hiring);
    }

    const [totalJobs, totalEmployers] = filtered.reduce(
      (acc, group) => {
        acc[0] += group.jobs.length;
        acc[1] += 1;
        return acc;
      },
      [0, 0]
    );

    setFilteredJobs(filtered);
    setTotalMatchingJobs(totalJobs);
    setTotalMatchingEmployers(totalEmployers);
  }, [groupedJobs, debouncedSearchQuery, urgentlyHiring]);

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col justify-between bg-secondary">
        <div className="flex flex-col gap-2 self-stretch p-[12px]">
          <div className="text-md text-gray-700 px-3 py-[20px] font-medium">
            {totalMatchingJobs > 0
              ? `${totalMatchingJobs} matching jobs from ${totalMatchingEmployers} 
            employers`
              : "No matching jobs found"}
          </div>
          <main>
            {filteredJobs &&
              filteredJobs.map((group) => (
                <EmployerCard key={group.employer_title} props={group} />
              ))}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-row items-start justify-between bg-secondary">
      <aside className="w-1/4 p-4 bg-card self-stretch border-r border-t border-cardTertiary">
        <div className="flex flex-col self-stretch gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="searchJobs"
              className="text-md text-primaryForeground font-bold"
            >
              Search Jobs
            </label>
            <input
              id="searchJobs"
              type="text"
              placeholder="Search jobs by title or employer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded border border-cardTertiary text-foreground bg-secondary transition-shadow duration-150 shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="flex gap-3 items-center">
            <input
              id="urgentlyHiring"
              type="checkbox"
              className="h-6 w-6 text rounded text-primary focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              checked={urgentlyHiring}
              onChange={(e) => setUrgentlyHiring(e.target.checked)}
            />
            <label
              className="text-md text-primaryForeground cursor-pointer font-bold"
              htmlFor="urgentlyHiring"
            >
              Urgently Hiring
            </label>
          </div>
        </div>
      </aside>
      <main className="flex flex-col gap-2 w-3/4 p-[12px]">
        <div className="text-md text-gray-700 px-3 py-[20px] font-medium">
          {totalMatchingJobs > 0
            ? `${totalMatchingJobs} matching jobs from ${totalMatchingEmployers} 
            employers`
            : "No matching jobs found"}
        </div>
        {filteredJobs &&
          filteredJobs.map((group) => (
            <EmployerCard key={group.employer_title} props={group} />
          ))}
      </main>
    </div>
  );
}
