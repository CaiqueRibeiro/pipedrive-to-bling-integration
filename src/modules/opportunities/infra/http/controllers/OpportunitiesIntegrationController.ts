import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IntegratePipedriveToBlingUseCase from '@modules/opportunities/useCases/IntegratePipedriveToBlingUseCase';

export default class OpportunitiesIntegrationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const integratePipedriveToBlingUseCase = container.resolve(
      IntegratePipedriveToBlingUseCase,
    );

    await integratePipedriveToBlingUseCase.execute();

    return response.json({ ok: true });
  }
}
