import { Injectable } from '@nestjs/common';
import { LinkRepository } from '../link.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from '../../link.entity';
import { Repository } from 'typeorm';
import { FindOneLinkOptions } from '../../interfaces/find-one-link-options.interface';
import { ListLinkOptions } from '../../interfaces/list-link-options.interface';

@Injectable()
export class TypeormLinkRepository implements LinkRepository {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(data: { url: string }): Promise<Link> {
    const link = new Link();
    link.url = data.url;
    return await this.linkRepository.save(link);
  }

  async findOne(options: FindOneLinkOptions): Promise<Link | undefined> {
    const qb = this.linkRepository.createQueryBuilder('link');
    qb.where(`link.${options.key} = :value`, { value: options.value });
    if (options.relations)
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`link.${relation}`, relation);
      });

    return await qb.getOne();
  }

  async list(
    options: ListLinkOptions,
  ): Promise<{ count: number; links: Link[] }> {
    const { page, per_page } = options;
    const qb = this.linkRepository.createQueryBuilder('link');
    if (options.relations)
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`link.${relation}`, relation);
      });

    if (options.where) {
      options.where.forEach((where) => {
        qb.where(`link.${where.key} = :value`, { value: where.value });
      });
    }

    if (page && per_page) {
      qb.skip(page * per_page);
      qb.take(per_page);
    }

    const [links, count] = await qb.getManyAndCount();

    return { links, count };
  }

  async delete(linkId: string): Promise<void> {
    await this.linkRepository.delete({ id: linkId });
  }
}
