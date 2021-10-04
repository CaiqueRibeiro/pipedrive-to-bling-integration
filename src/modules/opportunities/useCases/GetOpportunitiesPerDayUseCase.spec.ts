import FakeOpportunitiesRepository from '@modules/opportunities/infra/typeorm/repositories/fakes/FakeOpportunitiesRepository';
import GetOpportunitiesPerDayUseCase from '@modules/opportunities/useCases/GetOpportunitiesPerDayUseCase';

let fakeOpportunitiesRepository: FakeOpportunitiesRepository;
let getOpportunitiesPerDayUseCase: GetOpportunitiesPerDayUseCase;

describe('GetOpportunitiesPerDayUseCase', () => {
  beforeEach(() => {
    fakeOpportunitiesRepository = new FakeOpportunitiesRepository();

    getOpportunitiesPerDayUseCase = new GetOpportunitiesPerDayUseCase(
      fakeOpportunitiesRepository,
    );
  });

  it('should be able to list opportunities on a specific day', async () => {
    const opportunityOne = await fakeOpportunitiesRepository.create({
      date: '01/10/2021',
      value: 349,
    });

    const opportunityTwo = await fakeOpportunitiesRepository.create({
      date: '02/10/2021',
      value: 1948,
    });

    const opportunities = await getOpportunitiesPerDayUseCase.execute();

    expect(opportunities).toEqual([opportunityOne, opportunityTwo]);
  });

  it('should return empty array if there is no opportunity', async () => {
    const opportunities = await getOpportunitiesPerDayUseCase.execute();

    expect(opportunities).toEqual([]);
  });
});
