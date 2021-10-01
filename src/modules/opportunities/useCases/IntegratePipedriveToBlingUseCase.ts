import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { parseISO, format } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import BlingService from '@modules/opportunities/services/BlingService';
import PipedriveService from '@modules/opportunities/services/PipedriveService';
import { IDealDTO } from '@modules/opportunities/dtos/IDealDTO';
import AggregateDeals from '@modules/opportunities/services/AgreggateDeals';
import Opportunity from '../infra/typeorm/schemas/Opportunity';

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

    const dateAndValuesOfDeals = [];

    for (const deal of dealsWithProducts) {
      const products = await this.pipedriveService.returnDealWithProducts(
        deal.id,
      );

      if (products) {
        const xml = await this.blingService.generateXml(deal, products);
        const orderFound = await this.blingService.getOrder(deal.id);

        if (!orderFound) {
          await this.blingService.sendNewOrder(xml);
        }

        const dealDate = format(parseISO(deal.add_time), 'dd/MM/yyyy');

        dateAndValuesOfDeals.push({ date: dealDate, value: deal.value });
      }
    }

    const aggregatedDeals =
      this.aggregateDeals.aggregateDeal(dateAndValuesOfDeals);

    aggregatedDeals.forEach(async (deal: Opportunity) =>
      this.opportunitiesRepository.create(deal),
    );
  }
}

export default IntegratePipedriveToBlingUseCase;
