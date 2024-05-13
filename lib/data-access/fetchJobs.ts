import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const fetchJobs = async () => {
    const jobs = await prisma.job.findMany()
    return {'ok': true, data: jobs}
}


export const fetchJobById = async (jobId: number) => {
    // Attempt to find a single job record by its unique ID
    const job = await prisma.job.findUnique({
        where: {
            id: jobId
        }
    });

    // Check if the job was found and return an appropriate response
    if (job) {
        return { ok: true, data: job };
    } else {
        return { ok: false, data: null };
    }
};
