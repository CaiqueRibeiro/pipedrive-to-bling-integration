import { getMongoRepository, MongoRepository } from 'typeorm';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import IOpportunityDTO from '@modules/opportunities/dtos/IOpportunityDTO';
import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';

class OpportunitiesRepository implements IOpportunitiesRepository {
  private ormRepository: MongoRepository<Opportunity>;

  constructor() {
    this.ormRepository = getMongoRepository(Opportunity, 'mongo');
  }

  public async create({
    id,
    date,
    client,
    items,
  }: IOpportunityDTO): Promise<Opportunity> {
    const opportunity = this.ormRepository.create({
      id,
      date,
      client,
      items,
    });

    await this.ormRepository.save(opportunity);

    return opportunity;
  }
}

export default OpportunitiesRepository;
