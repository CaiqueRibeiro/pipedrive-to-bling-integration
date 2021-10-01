import { getMongoRepository, MongoRepository } from 'typeorm';
import IOpportunitiesRepository from '@modules/opportunities/repositories/IOpportunitiesRepository';
import Opportunity from '@modules/opportunities/infra/typeorm/schemas/Opportunity';

class OpportunitiesRepository implements IOpportunitiesRepository {
  private ormRepository: MongoRepository<Opportunity>;

  constructor() {
    this.ormRepository = getMongoRepository(Opportunity, 'mongo');
  }

  public async create(opportunity: Opportunity): Promise<Opportunity> {
    const opportunityCreated = this.ormRepository.create(opportunity);

    await this.ormRepository.save(opportunityCreated);

    return opportunityCreated;
  }

  public async getAll(): Promise<Opportunity[] | null> {
    const opportunities = await this.ormRepository.find();

    return opportunities;
  }
}

export default OpportunitiesRepository;
