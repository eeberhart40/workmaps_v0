import { fetchJobs } from "./fetchJobs";

test('basic test for fetchJobs', async () => {
    const jobsData = await fetchJobs();  // Assuming fetchJobs() returns a Promise
    expect(jobsData).toBeDefined();  // Check that the fetchJobs function returns something
    expect(jobsData.ok).toBe(true);  // Ensure the operation was successful
    expect(jobsData.data).toBeDefined();  // Check that data exists in the response
    expect(jobsData.data.length).toBe(16);  // Check that the length of the data array matches 
});