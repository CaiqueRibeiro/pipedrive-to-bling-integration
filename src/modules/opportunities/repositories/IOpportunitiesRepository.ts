import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';

export default interface IOpportunitiesRepository {
  create(data: Opportunity): Promise<Opportunity>;
  getAll(): Promise<Opportunity[] | null>;
}
