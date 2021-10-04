import {
  ObjectID,
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('opportunities')
class Opportunity {
  @ObjectIdColumn()
  id: ObjectID;

  @PrimaryColumn()
  date: string;

  @Column()
  value: number;
}

export default Opportunity;
