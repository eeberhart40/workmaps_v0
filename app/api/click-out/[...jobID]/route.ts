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
  if (!params.jobID || params.jobID.length === 0) {
    return redirectHome();
  }

  const jobIdStr = params.jobID[0]; // Assuming that the jobID is always the first element
  const jobId = parseInt(jobIdStr, 10);

  // Check if the parsed jobId is a valid number
  if (isNaN(jobId)) {
    return redirectHome();
  }

  try {
    const job = await fetchJobById(jobId);

    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, result: job }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job by ID:", error);

    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
