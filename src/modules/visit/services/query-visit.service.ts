import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../repositories/visit.repository';
import { ListVisitsDto } from '../dtos/list-visits.dto';
import { QueryTimeIntervalDto } from '../dtos/query-time-interval.dto';
import { Visit } from '../visit.entity';
import { FormattedVisit } from '../interfaces/formatted-visit.interface';
import { formatVisits } from '../helpers/format-visits.helper';

@Injectable()
export class QueryVisitsService {
  constructor(private readonly visitRepository: VisitRepository) {}

  async listVisits(options: ListVisitsDto): Promise<FormattedVisit[]> {
    const { visits } = await this.visitRepository.list(options);
    const formattedVisits = formatVisits(visits);
    return formattedVisits;
  }

  async getVisitsByLinkId(linkId: string): Promise<Visit[]> {
    return await this.visitRepository.getVisitsByLinkId(linkId);
  }

  async getVisitsByLinkIds(linkIds: string[]): Promise<Visit[]> {
    return await this.visitRepository.getVisitsByLinkIds(linkIds);
  }

  async getTop5Visits(interval: QueryTimeIntervalDto): Promise<Visit[]> {
    return await this.visitRepository.getTop5Visits(interval);
  }
}
