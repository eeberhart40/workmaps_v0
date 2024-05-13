import { type NextRequest, NextResponse } from "next/server";
import { fetchJobById } from "@/lib/data-access/fetchJobs";

const redirectHome = () =>
  NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL));

type Params = {
  params: {
    jobID?: string[];
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  const url = new URL(request.url);

  // Parse jobID from the string array to a single number
  const jobIdStr = params.jobID ? params.jobID[0] : ""; // Assuming that the jobID is always the first element
  const jobId = parseInt(jobIdStr, 10);

  // Check if the parsed jobId is a valid number
  if (isNaN(jobId)) {
    return redirectHome();
  }

  const job = await fetchJobById(jobId).catch((e) => {
    return null;
  });

  return NextResponse.json({
    ok: job ? job?.ok : false,
    result: job,
  });
}
