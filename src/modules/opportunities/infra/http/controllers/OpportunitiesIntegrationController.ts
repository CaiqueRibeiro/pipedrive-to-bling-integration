import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IntegratePipedriveToBlingUseCase from '@modules/opportunities/useCases/IntegratePipedriveToBlingUseCase';

export default class OpportunitiesIntegrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const integratePipedriveToBlingUseCase = container.resolve(
      IntegratePipedriveToBlingUseCase,
    );

    const result = await integratePipedriveToBlingUseCase.execute();
    if (result.message) {
      return response.status(200).json(result);
    }
    return response.status(400).json(result);
  }
}
