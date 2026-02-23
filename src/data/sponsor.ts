export interface Sponsor {
  name: string; // e.g. "Acme Corp"
  message: string; // max 140 chars
  url: string; // sponsor link
  startDate: string; // ISO date
  endDate: string; // ISO date
}

// Set to null when there's no active sponsor
export const ACTIVE_SPONSOR: Sponsor | null = null;
