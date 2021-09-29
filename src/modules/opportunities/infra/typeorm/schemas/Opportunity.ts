import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('opportunities')
class Opportunity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: Date;

  @Column()
  client: object;

  @Column()
  items: object;
}

export default Opportunity;
