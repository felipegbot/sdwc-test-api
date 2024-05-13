import moment from '@/common/libs/moment';
import { FormattedVisit } from '../interfaces/formatted-visit.interface';
import { Visit } from '../visit.entity';

export const formatVisits = (visits: Visit[]): FormattedVisit[] => {
  const formattedVisits: FormattedVisit[] = [];

  for (const visit of visits) {
    const { date, link, clicks: visits } = visit;

    const alreadyIn = formattedVisits.find(
      (formattedVisit) =>
        formattedVisit.date == moment(date).format('YYYY-MM-DD'),
    );
    if (alreadyIn) {
      alreadyIn.clicks = [
        ...alreadyIn.clicks,
        {
          link: link.url,
          visits,
        },
      ];
      alreadyIn.count += visits;
    } else {
      formattedVisits.push({
        date: moment(date).format('YYYY-MM-DD'),
        count: visits,
        clicks: [
          {
            link: link.url,
            visits,
          },
        ],
      });
    }
  }

  return formattedVisits;
};
