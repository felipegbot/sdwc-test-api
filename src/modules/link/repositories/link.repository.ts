import { FindOneLinkOptions } from '../interfaces/find-one-link-options.interface';
import { ListLinkOptions } from '../interfaces/list-link-options.interface';
import { Link } from '../link.entity';

export abstract class LinkRepository {
  abstract create(data: { url: string }): Promise<Link>;

  abstract findOne(data: FindOneLinkOptions): Promise<Link | undefined>;

  abstract list(
    options: ListLinkOptions,
  ): Promise<{ count: number; links: Link[] }>;

  abstract delete(linkId: string): Promise<void>;
}
