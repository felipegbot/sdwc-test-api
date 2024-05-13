import { ListVisitsDto } from '../dtos/list-visits.dto';
import { QueryTimeIntervalDto } from '../dtos/query-time-interval.dto';
import { QueryVisitsByLinkIds } from '../dtos/query-visits-by-link-ids.dto';
import { Visit } from '../visit.entity';

export abstract class VisitRepository {
  abstract generateData(allLinksIds: string[]): Promise<void>;

  abstract list(
    options: ListVisitsDto,
  ): Promise<{ count: number; visits: Visit[] }>;

  abstract getVisitsByLinkId(
    linkId: string,
    interval: QueryTimeIntervalDto,
  ): Promise<Visit[]>;

  abstract getVisitsByLinkIds(query: QueryVisitsByLinkIds): Promise<Visit[]>;

  abstract getTop5Visits(
    interval: QueryTimeIntervalDto,
  ): Promise<{ link_id: string; clicks: number; link_url: string }[]>;
}
