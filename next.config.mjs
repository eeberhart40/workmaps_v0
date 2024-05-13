/** @type {import('next').NextConfig} */

const nextConfig = {
    rewrites: async () => [
      // These routes redirect the user. API routes redirect faster than server
      // components, but must live in the `api` directory. These rewrites allow us
      // to hide the `/api` portion of the URL while keeping the redirect fast.
      {
        source: "/click-out/:jobID*",
        destination: "/api/click-out/:jobID*",
      },
    ],
  }

export default nextConfig;
