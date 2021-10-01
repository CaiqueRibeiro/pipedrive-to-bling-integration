import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';

@injectable()
class GetOppourtunitiesPerDayUseCase {
  constructor(
    @inject('OpportunitiesRepository')
    private opportunitiesRepository: IOpportunitiesRepository,
  ) {}

  async execute(): Promise<Opportunity[] | null> {
    try {
      const opportunities = this.opportunitiesRepository.getAll();
      return opportunities;
    } catch (error) {
      throw new AppError(`Error in getting all opportunities per day!`, 400);
    }
  }
}

export default GetOppourtunitiesPerDayUseCase;
