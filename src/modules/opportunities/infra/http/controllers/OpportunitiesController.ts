import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetOpportunitiesPerDayUseCase from '@modules/opportunities/useCases/GetOpportunitiesPerDayUseCase';

export default class OpportunitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getOpportunitiesPerDayUseCase = container.resolve(
      GetOpportunitiesPerDayUseCase,
    );

    const opportunitiesPerDay = await getOpportunitiesPerDayUseCase.execute();

    return response.json(opportunitiesPerDay);
  }
}
