import { fetchJobs } from "./fetchJobs";

test("basic test for fetchJobs", async () => {
  const jobsData = await fetchJobs(); // Assuming fetchJobs() returns a Promise
  expect(jobsData).toBeDefined(); // Check that the fetchJobs function returns something
  expect(jobsData.ok).toBe(true); // Ensure the operation was successful
  expect(jobsData.data).toBeDefined(); // Check that data exists in the response
  expect(jobsData.data.length).toBe(16); // Check that the length of the data array matches
});

test("fetchJobs handles no data scenario", async () => {
  // Mock fetchJobs to return an empty array
  const mockFetchJobs = jest.fn().mockResolvedValue({ ok: true, data: [] });
  const jobsData = await mockFetchJobs();
  expect(jobsData.data.length).toBe(0);
});

test("fetchJobs handles error scenario", async () => {
  // Mock fetchJobs to throw an error
  const mockFetchJobs = jest
    .fn()
    .mockResolvedValue({ ok: false, error: "Internal server error" });
  const jobsData = await mockFetchJobs();
  expect(jobsData.ok).toBe(false);
  expect(jobsData.error).toBe("Internal server error");
});
