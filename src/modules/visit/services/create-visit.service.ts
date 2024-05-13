import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../repositories/visit.repository';
import { QueryLinkService } from '@/modules/link/services/query-link.service';

@Injectable()
export class CreateVisitsService {
  constructor(
    private readonly visitRepository: VisitRepository,
    private readonly queryLinksService: QueryLinkService,
  ) {}

  async generateData(): Promise<void> {
    const { links } = await this.queryLinksService.list();
    const allLinksIds = links.map((link) => link.id);

    await this.visitRepository.generateData(allLinksIds);
  }
}
