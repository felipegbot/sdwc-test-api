import { ListVisitsDto } from '../dtos/list-visits.dto';
import { QueryTimeIntervalDto } from '../dtos/query-time-interval.dto';
import { Visit } from '../visit.entity';

export abstract class VisitRepository {
  abstract generateData(allLinksIds: string[]): Promise<void>;

  abstract list(
    options: ListVisitsDto,
  ): Promise<{ count: number; visits: Visit[] }>;

  abstract getVisitsByLinkId(linkId: string): Promise<Visit[]>;

  abstract getVisitsByLinkIds(linkIds: string[]): Promise<Visit[]>;

  abstract getTop5Visits(interval: QueryTimeIntervalDto): Promise<Visit[]>;
}
