import { Link } from '@/modules/link/link.entity';

export interface FormattedVisit {
  date: string;
  count: number;
  clicks: { link: Link; visits: number }[];
}
