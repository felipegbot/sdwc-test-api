import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateVisitsService } from '../services/create-visit.service';
import { QueryVisitsService } from '../services/query-visit.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ListVisitsDto } from '../dtos/list-visits.dto';
import { QueryTimeIntervalDto } from '../dtos/query-time-interval.dto';
import { QueryLinkService } from '@/modules/link/services/query-link.service';
import ApiError from '@/common/error/entities/api-error.entity';
import { QueryVisitsByLinkIds } from '../dtos/query-visits-by-link-ids.dto';

@Controller('visits')
export class VisitController {
  constructor(
    private readonly createVisitsService: CreateVisitsService,
    private readonly queryVisitsService: QueryVisitsService,
    private readonly queryLinkService: QueryLinkService,
  ) {}

  @Post('/generate-data')
  @UseGuards(JwtAuthGuard)
  async generateData() {
    await this.createVisitsService.generateData();
    return { ok: true };
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async listVisits(@Query() listVisitsDto: ListVisitsDto) {
    const visits = await this.queryVisitsService.listVisits(listVisitsDto);
    return { ok: true, visits };
  }

  @Get('/by-link/:linkId')
  @UseGuards(JwtAuthGuard)
  async getVisitsByLinkId(
    @Param('linkId') linkId: string,
    @Query() interval: QueryTimeIntervalDto,
  ) {
    const link = await this.queryLinkService.findOne({
      key: 'id',
      value: linkId,
    });

    if (!link) throw new ApiError('link-not-found', 'Link não encontrado', 404);
    const visits = await this.queryVisitsService.getVisitsByLinkId(
      linkId,
      interval,
    );
    return { ok: true, visits };
  }

  @Get('/by-links')
  @UseGuards(JwtAuthGuard)
  async getVisitsByLinkIds(@Query() query: QueryVisitsByLinkIds) {
    const visits = await this.queryVisitsService.getVisitsByLinkIds(query);
    return { ok: true, visits };
  }

  @Get('/top5')
  @UseGuards(JwtAuthGuard)
  async getTop5Visits(@Query() interval: QueryTimeIntervalDto) {
    const visits = await this.queryVisitsService.getTop5Visits(interval);
    return { ok: true, visits };
  }
}
