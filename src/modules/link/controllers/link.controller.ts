import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateLinkService } from '../services/create-link.service';
import { QueryLinkService } from '../services/query-link.service';
import ApiError from '@/common/error/entities/api-error.entity';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { Request } from 'express';
import { User } from '@/modules/user/user.entity';

@Controller('link')
export class LinkController {
  logger = new Logger(LinkController.name);
  constructor(
    private readonly createLinkService: CreateLinkService,
    private readonly queryLinkService: QueryLinkService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createLink(@Req() req: Request, @Body() { url }: { url: string }) {
    const user = req.user as User;
    const alreadyExists = await this.queryLinkService.findOne({
      key: 'url',
      value: url,
    });
    if (alreadyExists)
      throw new ApiError('link-already exists', 'Link já existe', 400);
    const link = await this.createLinkService.create({ url });
    this.logger.log(
      `Link ${link.id} created with url ${link.url} by user ${user.id}`,
    );
    return { ok: true, link };
  }

  @Get('/list')
  @UseGuards(JwtAuthGuard)
  async listLinks(@Query() query: PaginationDto) {
    const { links, count } = await this.queryLinkService.list({ ...query });

    return { ok: true, count, links };
  }

  @Get('/find/:linkId')
  @UseGuards(JwtAuthGuard)
  async findLink(@Param('linkId') linkId: string) {
    const link = await this.queryLinkService.findOne({
      key: 'id',
      value: linkId,
    });
    if (!link) throw new ApiError('link-not-found', 'Link não encontrado', 404);
    return { ok: true, link };
  }

  @Delete('/delete/:linkId')
  @UseGuards(JwtAuthGuard)
  async deleteLink(@Req() req: Request, @Param('linkId') linkId: string) {
    const user = req.user as User;
    await this.createLinkService.delete(linkId);

    this.logger.log(`Link ${linkId} deleted by user ${user.id}`);
    return { ok: true };
  }
}
