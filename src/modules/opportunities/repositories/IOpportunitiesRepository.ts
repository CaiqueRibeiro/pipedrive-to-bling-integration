import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';
import IOpportunityDTO from '@modules/opportunities/dtos/IOpportunityDTO';

export default interface IOpportunitiesRepository {
  create(data: IOpportunityDTO): Promise<Opportunity | null>;
  getAll(): Promise<Opportunity[] | null>;
}
