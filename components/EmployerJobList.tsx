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
  const [totalMatchingJobs, setTotalMatchingJobs] = useState(totalJobs);
  const [totalMatchingEmployers, setTotalMatchingEmployers] =
    useState(totalEmployers);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filteredJobs, setFilteredJobs] = useState(groupedJobs);
  const [urgentlyHiring, setUrgentlyHiring] = useState(false);
  const [sortHourlyRate, setSortHourlyRate] = useState(false);

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

    if (sortHourlyRate) {
      filtered = filtered.map((group) => ({
        ...group,
        jobs: group.jobs.sort(
          (a, b) => (parseInt(a.payMin) || 0) - (parseInt(b.payMin) || 0)
        ),
      }));
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
  }, [groupedJobs, debouncedSearchQuery, urgentlyHiring, sortHourlyRate]);

  if (isMobile) {
    return (
      <main className="flex min-h-screen flex-col justify-between bg-secondary">
        <div className="flex flex-col gap-2 self-stretch p-[12px]">
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
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-row items-start justify-between bg-secondary">
      <aside className="w-1/4 p-4 bg-card self-stretch border-r border-t border-cardTertiary">
        <div className="flex flex-col self-stretch gap-4">
          <input
            type="text"
            placeholder="Search jobs by title or employer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded border border-cardTertiary text-foreground bg-secondary transition-shadow duration-150 shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="flex gap-3 items-center">
            <input
              id="urgentlyHiring"
              type="checkbox"
              className="h-6 w-6 text rounded text-primary focus-visible:ring-1 focus-visible:ring-primary focus:outline-none"
              checked={urgentlyHiring}
              onChange={(e) => setUrgentlyHiring(e.target.checked)}
            />
            <label
              className="text-l text-primaryForeground cursor-pointer font-bold"
              htmlFor="urgentlyHiring"
            >
              Urgently Hiring
            </label>
          </div>
        </div>
      </aside>
      <div className="flex flex-col gap-2 w-3/4 p-[12px]">
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
      </div>
    </main>
  );
}
