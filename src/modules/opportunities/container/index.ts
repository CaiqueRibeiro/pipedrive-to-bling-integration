import { container } from 'tsyringe';

import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import OpportunitiesRepository from '@modules/opportunities/infra/typeorm/repositories/OpportunitiesRepository';

container.registerSingleton<IOpportunitiesRepository>(
  'OpportunitiesRepository',
  OpportunitiesRepository,
);
