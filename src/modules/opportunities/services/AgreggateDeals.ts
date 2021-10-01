import 'reflect-metadata';
import { parseISO, format } from 'date-fns';

import { IDealDTO } from '@modules/opportunities/dtos/IDealDTO';

interface IAggregatedDeals {
  [key: string]: {
    totalValue: 0;
  };
}

class AggregateDeals {
  public aggregateDeal(aggregatedDeals: IAggregatedDeals, deal: IDealDTO): any {
    const dealDate: keyof IAggregatedDeals = format(
      parseISO(deal.add_time),
      'dd/MM/yyyy',
    );

    if (!aggregatedDeals[dealDate]) {
      aggregatedDeals[dealDate] = { totalValue: 0 };
    }
    aggregatedDeals[dealDate].totalValue += deal.value;

    return aggregatedDeals;
  }
}

export default AggregateDeals;
