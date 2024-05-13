import { Module } from '@nestjs/common';
import { LinkRepository } from './repositories/link.repository';
import { TypeormLinkRepository } from './repositories/typeorm/link.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryLinkService } from './services/query-link.service';
import { CreateLinkService } from './services/create-link.service';
import { LinkController } from './controllers/link.controller';
import { Link } from './link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [
    CreateLinkService,
    QueryLinkService,
    {
      provide: LinkRepository,
      useClass: TypeormLinkRepository,
    },
  ],
  exports: [CreateLinkService, QueryLinkService],
})
export class LinkModule {}
