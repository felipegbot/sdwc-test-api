import { IsNotEmpty } from 'class-validator';
import { QueryTimeIntervalDto } from './query-time-interval.dto';
import { Transform } from 'class-transformer';

export class QueryVisitsByLinkIds extends QueryTimeIntervalDto {
  @IsNotEmpty({
    context: {
      message: 'missing-linkIds',
      userMessage: 'linkIds é obrigatório',
    },
  })
  @Transform(({ value }) => `${value}`.split(','))
  linkIds: string[];
}
