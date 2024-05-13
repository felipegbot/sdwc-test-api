import { Injectable } from '@nestjs/common';
import { LinkRepository } from '../repositories/link.repository';
import { Link } from '../link.entity';

@Injectable()
export class CreateLinkService {
  constructor(private readonly linkRepository: LinkRepository) {}

  async create(data: { url: string }): Promise<Link> {
    return await this.linkRepository.create(data);
  }

  async delete(linkId: string): Promise<void> {
    return await this.linkRepository.delete(linkId);
  }
}
