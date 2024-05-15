export type Job = {
  id: number;
  title: string;
  description: string | null;
  employer_title: string;
  employer_logo_url: string;
  payMin: string;
  payMax: string;
  cpc: string;
  cpa: string;
  verified: boolean;
  urgent_hiring: boolean;
  updated_at: string;
  created_at: string;
};
