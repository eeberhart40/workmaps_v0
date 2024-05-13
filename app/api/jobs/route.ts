import { NextResponse } from "next/server";

import { fetchJobs } from "@/lib/data-access/fetchJobs";

export async function GET(request: Request) {
  try {
    const jobsData = await fetchJobs();
    return NextResponse.json(jobsData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error }, { status: 500 });
  }
}
