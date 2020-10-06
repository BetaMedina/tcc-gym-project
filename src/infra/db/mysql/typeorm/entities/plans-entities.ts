import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity('plans')
class Plans extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column('varchar')
  name: string;

  @Column({ type: 'float', precision: 10, scale: 2 })
  price: Number;
  
  @Column({ type: 'float', precision: 10, scale: 1 })
  duration: Number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Plans }
