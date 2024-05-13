export interface FormattedVisit {
  date: string;
  count: number;
  clicks: { link: string; visits: number }[];
}
