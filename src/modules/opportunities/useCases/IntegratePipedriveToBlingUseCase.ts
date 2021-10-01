import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import BlingService from '@modules/opportunities/services/BlingService';
import PipedriveService from '@modules/opportunities/services/PipedriveService';
import { IDealDTO } from '@modules/opportunities/dtos/IDealDTO';
import AggregateDeals from '@modules/opportunities/services/AgreggateDeals';

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
    @inject('AggregateDeals')
    private aggregateDeals: AggregateDeals,
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

    let aggregatedDeals = [];

    for (const deal of dealsWithProducts) {
      const products = await this.pipedriveService.returnDealWithProducts(
        deal.id,
      );

      if (products) {
        const xml = await this.blingService.generateXml(deal, products);
        const orderFound = await this.blingService.getOrder(deal.id);

        if (!orderFound) {
          await this.blingService.sendNewOrder(xml);

          aggregatedDeals = this.aggregateDeals.aggregateDeal(
            aggregatedDeals,
            deal,
          );
        }
      }
    }

    Object.entries(aggregatedDeals).forEach(async item => {
      const obj = {
        date: item[0],
        totalValue: item[1].totalValue,
      };
      console.log(obj);
      await this.opportunitiesRepository.create(obj);
    });
  }
}

export default IntegratePipedriveToBlingUseCase;
