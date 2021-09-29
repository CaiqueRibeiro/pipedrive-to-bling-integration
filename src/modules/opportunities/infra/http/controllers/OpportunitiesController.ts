import { Request, Response } from 'express';
// import { container } from 'tsyringe';
// import ListOpportunitiesUseCase from '@modules/appointments/services/ListOpportunitiesUseCase';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}
