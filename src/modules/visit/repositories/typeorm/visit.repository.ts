import { Injectable } from '@nestjs/common';
import { Visit } from '../../visit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import moment from '@/common/libs/moment';
import { ListVisitsDto } from '../../dtos/list-visits.dto';
import { VisitRepository } from '../visit.repository';
import { QueryTimeIntervalDto } from '../../dtos/query-time-interval.dto';

@Injectable()
export class TypeormVisitRepository implements VisitRepository {
  constructor(
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
  ) {}

  async generateData(allLinksIds: string[]): Promise<void> {
    await this.visitRepository.clear();
    const visitsToCreate: Visit[] = [];
    const initialDate = moment();
    const endDate = initialDate.subtract(30, 'days').toDate();

    for (let i = initialDate; i.isAfter(endDate); i.subtract(1, 'days')) {
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

    const [visits, count] = await qb.getManyAndCount();
    return { count, visits };
  }

  async getVisitsByLinkId(linkId: string): Promise<Visit[]> {
    const visits = this.visitRepository.find({ where: { link_id: linkId } });
    return visits;
  }

  async getVisitsByLinkIds(linkIds: string[]): Promise<Visit[]> {
    const qb = this.visitRepository.createQueryBuilder('visit');
    qb.whereInIds(linkIds);
    const visits = await qb.getMany();
    return visits;
  }

  async getTop5Visits(interval: QueryTimeIntervalDto): Promise<Visit[]> {
    const qb = this.visitRepository.createQueryBuilder('visit');
    qb.where('visit.date >= :start_date', { start_date: interval.start_date });
    qb.andWhere('visit.date <= :end_date', { end_date: interval.end_date });
    qb.orderBy('visit.clicks', 'DESC');
    qb.limit(5);
    const visits = await qb.getMany();
    return visits;
  }
}
