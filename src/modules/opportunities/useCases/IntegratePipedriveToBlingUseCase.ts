import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import BlingService from '@modules/opportunities/services/BlingService';
import PipedriveService from '@modules/opportunities/services/PipedriveService';
import {
  IDealDTO,
  IDealProductDTO,
} from '@modules/opportunities/dtos/IDealDTO';

export interface IListProviderAppointments {
  providerType: string;
  providerId: string;
  date: string;
}

@injectable()
class IntegratePipedriveToBlingUseCase {
  constructor(
    @inject('BlingService')
    private blingService: BlingService,
    @inject('PipedriveService')
    private pipedriveService: PipedriveService,
    @inject('OpportunitiesRepository')
    private opportunitiesRepository: IOpportunitiesRepository,
  ) {}

  async execute(): Promise<void> {
    const pipedriveDeals = await this.pipedriveService.returnDeals();

    if (!pipedriveDeals) {
      throw new AppError(`Pipedrives not found!`, 400);
    }

    const dealsWithProducts = pipedriveDeals.filter(
      (deal: IDealDTO) => deal.products_count,
    );

    for (const deal of dealsWithProducts) {
      const products = await this.pipedriveService.returnDealWithProducts(
        deal.id,
      );
    }
  }
}

export default IntegratePipedriveToBlingUseCase;
