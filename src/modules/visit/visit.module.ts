import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { CreateVisitsService } from './services/create-visit.service';
import { VisitController } from './controllers/visit.controller';
import { VisitRepository } from './repositories/visit.repository';
import { TypeormVisitRepository } from './repositories/typeorm/visit.repository';
import { QueryVisitsService } from './services/query-visit.service';
import { LinkModule } from '../link/link.module';

@Module({
  imports: [TypeOrmModule.forFeature([Visit]), LinkModule],
  controllers: [VisitController],
  providers: [
    CreateVisitsService,
    QueryVisitsService,
    { provide: VisitRepository, useClass: TypeormVisitRepository },
  ],
})
export class VisitModule {}
