import { uuid } from 'uuidv4';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';
import IOpportunityDTO from '@modules/opportunities/dtos/IOpportunityDTO';

class FakeOpportunitiesRepository implements IOpportunitiesRepository {
  private opportunities: Opportunity[] = [];

  public async create(
    opportunity: IOpportunityDTO,
  ): Promise<Opportunity | null> {
    const opportunityIndex = this.opportunities.findIndex(
      item => item.date === opportunity.date,
    );

    if (opportunityIndex >= 0) {
      this.opportunities[opportunityIndex].value = opportunity.value;
    }

    const newOpportunity = new Opportunity();
    Object.assign(newOpportunity, {
      id: uuid(),
      date: opportunity.date,
      value: opportunity.value,
    });

    this.opportunities.push(newOpportunity);

    return newOpportunity;
  }

  public async getAll(): Promise<Opportunity[] | null> {
    return this.opportunities;
  }
}

export default FakeOpportunitiesRepository;
