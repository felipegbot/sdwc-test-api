import { Injectable } from '@nestjs/common';
import { Visit } from '../../visit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import moment from '@/common/libs/moment';
import { ListVisitsDto } from '../../dtos/list-visits.dto';
import { VisitRepository } from '../visit.repository';
import { QueryTimeIntervalDto } from '../../dtos/query-time-interval.dto';
import { QueryVisitsByLinkIds } from '../../dtos/query-visits-by-link-ids.dto';

@Injectable()
export class TypeormVisitRepository implements VisitRepository {
  constructor(
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
  ) {}

  async generateData(allLinksIds: string[]): Promise<void> {
    await this.visitRepository.clear();
    const visitsToCreate: Visit[] = [];

    const initialDate = moment().subtract(30, 'days');
    const endDate = moment();

    for (let i = initialDate; i.isBefore(endDate); i.add(1, 'days')) {
      allLinksIds.forEach((linkId) => {
        const visit = new Visit();
        visit.date = i.toDate();
        visit.link_id = linkId;
        visit.clicks = Math.floor(Math.random() * 50);
        visitsToCreate.push(visit);
      });
    }

    await this.visitRepository.save(visitsToCreate);
  }

  async list(
    options: ListVisitsDto,
  ): Promise<{ count: number; visits: Visit[] }> {
    const qb = this.visitRepository.createQueryBuilder('visit');

    if (options.start_date)
      qb.andWhere('visit.date >= :start_date', {
        start_date: options.start_date,
      });
    if (options.end_date)
      qb.andWhere('visit.date <= :end_date', { end_date: options.end_date });

    qb.leftJoinAndSelect('visit.link', 'link');

    const [visits, count] = await qb.getManyAndCount();
    return { count, visits };
  }

  async getVisitsByLinkId(
    linkId: string,
    interval: QueryTimeIntervalDto,
  ): Promise<Visit[]> {
    const qb = this.visitRepository.createQueryBuilder('visit');

    qb.leftJoinAndSelect('visit.link', 'link');
    if (interval.start_date)
      qb.andWhere('visit.date >= :start_date', {
        start_date: interval.start_date,
      });
    if (interval.end_date)
      qb.andWhere('visit.date <= :end_date', { end_date: interval.end_date });

    qb.andWhere('visit.link_id = :linkId', { linkId });

    const visits = await qb.getMany();
    return visits;
  }

  async getVisitsByLinkIds(query: QueryVisitsByLinkIds): Promise<Visit[]> {
    const qb = this.visitRepository.createQueryBuilder('visit');

    qb.leftJoinAndSelect('visit.link', 'link');
    if (query.start_date)
      qb.andWhere('visit.date >= :start_date', {
        start_date: query.start_date,
      });
    if (query.end_date)
      qb.andWhere('visit.date <= :end_date', { end_date: query.end_date });

    qb.andWhere('visit.link_id IN (:...linkIds)', {
      linkIds: query.linkIds,
    });

    const visits = await qb.getMany();
    return visits;
  }

  async getTop5Visits(
    interval: QueryTimeIntervalDto,
  ): Promise<{ link_id: string; clicks: number; link_url: string }[]> {
    const qb = this.visitRepository.createQueryBuilder('visit');
    qb.select('SUM(visit.clicks)', 'total_clicks');
    if (interval.start_date)
      qb.andWhere('visit.date >= :start_date', {
        start_date: interval.start_date,
      });
    if (interval.end_date)
      qb.andWhere('visit.date <= :end_date', { end_date: interval.end_date });

    qb.leftJoinAndSelect('visit.link', 'link');

    qb.addGroupBy('link.id');

    qb.orderBy('total_clicks', 'DESC');
    qb.limit(5);

    const rawVisits = await qb.getRawMany();

    const visits = rawVisits.map((rawVisit) => {
      return {
        link_id: rawVisit.link_id as string,
        clicks: Number(rawVisit.total_clicks),
        link_url: rawVisit.link_url as string,
      };
    });
    return visits;
  }
}
