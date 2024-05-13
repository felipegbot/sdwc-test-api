import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateVisitsService } from '../services/create-visit.service';
import { QueryVisitsService } from '../services/query-visit.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ListVisitsDto } from '../dtos/list-visits.dto';

@Controller('visits')
export class VisitController {
  constructor(
    private readonly createVisitsService: CreateVisitsService,
    private readonly queryVisitsService: QueryVisitsService,
  ) {}

  @Post('/generate-data')
  @UseGuards(JwtAuthGuard)
  async generateData() {
    await this.createVisitsService.generateData();
    return { ok: true };
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async listVisits(@Body() listVisitsDto: ListVisitsDto) {
    const visits = await this.queryVisitsService.listVisits(listVisitsDto);
    return { ok: true, visits };
  }
}
