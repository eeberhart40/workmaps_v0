import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/Logo";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workmaps Hourly Jobs",
  description: "Find your next job from our listings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <header>
          <div className="bg-card p-4 h-[60px] flex items-center">
            <Logo />
          </div>
        </header>
        {children}
        <footer>
          <div className="bg-card text-sm text-center text-primaryForeground">
            <p>&copy; 2024 Job Listings. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
