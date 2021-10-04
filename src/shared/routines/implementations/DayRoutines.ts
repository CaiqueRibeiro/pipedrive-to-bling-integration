import { container } from 'tsyringe';
import IRoutinesCommand from '@shared/routines/IRoutinesCommand';
import IntegratePipedriveToBlingUseCase from '@modules/opportunities/useCases/IntegratePipedriveToBlingUseCase';

export default class DayRoutines implements IRoutinesCommand {
  public async execute(): Promise<void> {
    const integratePipedriveToBlingUseCase = container.resolve(
      IntegratePipedriveToBlingUseCase,
    );

    await integratePipedriveToBlingUseCase.execute();
  }
}
