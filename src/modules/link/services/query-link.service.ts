import { Injectable } from '@nestjs/common';
import { FindOneLinkOptions } from '../interfaces/find-one-link-options.interface';
import { LinkRepository } from '../repositories/link.repository';
import { Link } from '../link.entity';
import { ListLinkOptions } from '../interfaces/list-link-options.interface';

@Injectable()
export class QueryLinkService {
  constructor(private readonly linkRepository: LinkRepository) {}

  async findOne(options: FindOneLinkOptions): Promise<Link> {
    return await this.linkRepository.findOne(options);
  }

  async list(
    options?: ListLinkOptions,
  ): Promise<{ count: number; links: Link[] }> {
    return await this.linkRepository.list(options ?? {});
  }
}
