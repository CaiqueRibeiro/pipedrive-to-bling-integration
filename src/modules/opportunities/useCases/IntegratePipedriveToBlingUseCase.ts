import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { parseISO, format } from 'date-fns';

import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import BlingService from '@modules/opportunities/services/BlingService';
import PipedriveService from '@modules/opportunities/services/PipedriveService';
import { IDealDTO } from '@modules/opportunities/dtos/IDealDTO';
import { IDealAmountPerDayDTO } from '@modules/opportunities/dtos/destiny/IDestinyServiceDTO';
import AggregateDeals from '@modules/opportunities/services/AggregateDeals';
import IOpportunityDTO from '../dtos/IOpportunityDTO';

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

  async execute(): Promise<{ message?: string; error?: string }> {
    const pipedriveDeals = await this.pipedriveService.returnDeals();

    if (!pipedriveDeals) {
      return { message: 'Negócios não encontrados no pipedrive' };
    }

    const dealsWithProducts = pipedriveDeals.filter(
      (deal: IDealDTO) => deal.products_count,
    );

    const dateAndValuesOfDeals: IDealAmountPerDayDTO[] = [];

    for (const deal of dealsWithProducts) {
      const products = await this.pipedriveService.returnDealWithProducts(
        deal.id,
      );

      if (products) {
        try {
          const xml = await this.blingService.generateXml(deal, products);
          const orderFound = await this.blingService.getOrder(deal.id);

          if (!orderFound) {
            await this.blingService.sendNewOrder(xml);
          }

          const dealDate = format(parseISO(deal.add_time), 'dd/MM/yyyy');
          dateAndValuesOfDeals.push({ date: dealDate, value: deal.value });
        } catch (error) {
          let errorMessage = 'Erro ao realizar integração';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          return { error: errorMessage };
        }
      }
    }

    const aggregatedDeals =
      this.aggregateDeals.aggregateDeal(dateAndValuesOfDeals);

    aggregatedDeals.forEach(async (deal: IOpportunityDTO) =>
      this.opportunitiesRepository.create(deal),
    );

    return {
      message: 'Integração realizada com sucesso',
    };
  }
}

export default IntegratePipedriveToBlingUseCase;
