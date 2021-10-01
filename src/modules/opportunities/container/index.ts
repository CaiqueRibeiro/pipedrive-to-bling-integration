import { container } from 'tsyringe';

import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import OpportunitiesRepository from '@modules/opportunities/infra/typeorm/repositories/OpportunitiesRepository';
import PipedriveService from '@modules/opportunities/services/PipedriveService';
import BlingService from '@modules/opportunities/services/BlingService';
import AggregateDeals from '@modules/opportunities/services/AgreggateDeals';

container.registerSingleton<IOpportunitiesRepository>(
  'OpportunitiesRepository',
  OpportunitiesRepository,
);

container.registerSingleton<BlingService>('BlingService', BlingService);

container.registerSingleton<PipedriveService>(
  'PipedriveService',
  PipedriveService,
);

container.registerSingleton<AggregateDeals>('AggregateDeals', AggregateDeals);
