import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateLinkService } from '../services/create-link.service';
import { QueryLinkService } from '../services/query-link.service';
import ApiError from '@/common/error/entities/api-error.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Controller('link')
export class LinkController {
  constructor(
    private readonly createLinkService: CreateLinkService,
    private readonly queryLinkService: QueryLinkService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createLink(@Body() { url }: { url: string }) {
    const alreadyExists = await this.queryLinkService.findOne({
      key: 'url',
      value: url,
    });
    if (alreadyExists)
      throw new ApiError('link-already exists', 'Link já existe', 400);
    const link = this.createLinkService.create({ url });

    return { ok: true, link };
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async listLinks(@Query() query: PaginationDto) {
    const links = await this.queryLinkService.list({ ...query });
    return { ok: true, links };
  }

  @Get('/find/:linkId')
  @UseGuards(JwtAuthGuard)
  async findLink(@Param('linkId') linkId: string) {
    const link = await this.queryLinkService.findOne({
      key: 'id',
      value: linkId,
    });
    return { ok: true, link };
  }

  @Delete('/delete/:linkId')
  @UseGuards(JwtAuthGuard)
  async deleteLink(@Param('linkId') linkId: string) {
    await this.createLinkService.delete(linkId);
    return { ok: true };
  }
}
