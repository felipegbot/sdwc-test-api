import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../repositories/visit.repository';
import { ListVisitsDto } from '../dtos/list-visits.dto';
import { QueryTimeIntervalDto } from '../dtos/query-time-interval.dto';
import { Visit } from '../visit.entity';
import { FormattedVisit } from '../interfaces/formatted-visit.interface';
import { formatVisits } from '../helpers/format-visits.helper';
import { QueryVisitsByLinkIds } from '../dtos/query-visits-by-link-ids.dto';

@Injectable()
export class QueryVisitsService {
  constructor(private readonly visitRepository: VisitRepository) {}

  async listVisits(options: ListVisitsDto): Promise<FormattedVisit[]> {
    const { visits } = await this.visitRepository.list(options);
    const formattedVisits = formatVisits(visits);
    return formattedVisits;
  }

  async getVisitsByLinkId(
    linkId: string,
    interval: QueryTimeIntervalDto,
  ): Promise<Visit[]> {
    return await this.visitRepository.getVisitsByLinkId(linkId, interval);
  }

  async getVisitsByLinkIds(
    query: QueryVisitsByLinkIds,
  ): Promise<FormattedVisit[]> {
    const visits = await this.visitRepository.getVisitsByLinkIds(query);
    const formattedVisits = formatVisits(visits);
    return formattedVisits;
  }

  async getTop5Visits(
    interval: QueryTimeIntervalDto,
  ): Promise<{ link_id: string; clicks: number; link_url: string }[]> {
    return await this.visitRepository.getTop5Visits(interval);
  }
}
