import IOpportunityDTO from '@modules/opportunities/dtos/IOpportunityDTO';
import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';

export default interface IOpportunitiesRepository {
  create(data: IOpportunityDTO): Promise<Opportunity>;
}
