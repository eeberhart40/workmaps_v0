import { NextResponse } from "next/server";
import { fetchJobs } from "@/lib/data-access/fetchJobs";

export async function GET(request: Request) {
  try {
    const jobsResponse = await fetchJobs();
    const { ok, data } = jobsResponse;

    if (!ok || !data) {
      return NextResponse.json(
        { ok: false, error: "Failed to fetch jobs" },
        { status: 500 }
      );
    }

    const verifiedJobs = data.filter((job) => job.verified);

    if (verifiedJobs.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No verified jobs found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ok: true, result: verifiedJobs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
