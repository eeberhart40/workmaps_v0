import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Job } from "../app/types/Job";

type JobListing = Pick<Job, "id" | "title" | "payMin" | "payMax">;

interface JobListingProps extends JobListing {
  employer_title: string;
}

export interface EmployerCardProps
  extends Pick<Job, "employer_logo_url" | "employer_title" | "urgent_hiring"> {
  jobs: JobListing[];
}

export const EmployerCard: FC<{ props: EmployerCardProps }> = ({ props }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 gap-3 bg-card rounded border border-cardTertiary self-stretch shadow">
      <div className="flex gap-2 items-center self-stretch">
        <Image
          src={props.employer_logo_url}
          alt={props.employer_title}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex flex-col gap-[2px]">
          <div className="text-xl text-primaryForeground font-bold">
            {props.employer_title}
          </div>
          {props.urgent_hiring && (
            <div className="bg-positive-100 p-1 rounded-full">
              <div className="text-m text-positive-200 font-medium px-[6px]">
                Urgently Hiring
              </div>
            </div>
          )}
        </div>
      </div>
      {props.jobs.map((job) => (
        <JobListing
          key={job.id}
          props={{ ...job, employer_title: props.employer_title }}
        />
      ))}
    </div>
  );
};

const JobListing: FC<{ props: JobListingProps }> = ({ props }) => {
  return (
    <div className="rounded border border-cardTertiary p-3 gap-3 flex justify-between items-center self-stretch shadow">
      <div className="flex flex-col gap-[2px]">
        <div className="text-l text-gray-900 font-bold">{props.title}</div>
        <div className="text-sm font-medium  text-gray-500">
          ${props.payMin} - {props.payMax} per hour
        </div>
      </div>
      <Link
        href={`/click-out/${props.id}`}
        className="text-primaryForeground bg-primary text-m rounded-[48px] py-2 px-3 font-semibold flex items-center justify-center hover:text-positive-200 focus-visible:ring-1 transform transition-transform duration-150 active:scale-95"
        aria-label={`Apply for ${props.title} at ${props.employer_title}`}
      >
        Apply
      </Link>
    </div>
  );
};
