import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('opportunities')
class Opportunity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: string;

  @Column()
  totalValue: object;
}

export default Opportunity;
