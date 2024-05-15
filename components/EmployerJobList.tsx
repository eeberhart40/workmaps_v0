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
  const [isGridView, setIsGridView] = useState<boolean>(true);

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

  const handleToggleView = () => {
    setIsGridView((prev) => !prev);
  };

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
        <div className="flex justify-between items-center text-md text-gray-700 px-3 py-[20px] font-medium">
          <span>
            {totalMatchingJobs > 0
              ? `${totalMatchingJobs} matching jobs from ${totalMatchingEmployers} employers`
              : "No matching jobs found"}
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!isGridView}
              className="sr-only peer"
              onChange={handleToggleView}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus-visible:ring-4 peer-focus:ring-primary dark:peer-focus:ring-positive-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-positive-200"></div>
            <span className="ms-3 text-med font-medium text-gray-900 dark:text-gray-300">
              {isGridView ? "Grid View" : "List View"}
            </span>
          </label>
        </div>
        <div
          className={
            isGridView
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-150px)] rounded"
              : "flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-150px)] rounded"
          }
        >
          {filteredJobs &&
            filteredJobs.map((group) => (
              <EmployerCard key={group.employer_title} props={group} />
            ))}
        </div>
      </main>
    </div>
  );
}
