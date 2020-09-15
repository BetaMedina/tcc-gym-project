import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Plans } from './plans-entities'
import { Users } from './users-entities'

@Entity('users-plans')
class UsersPlans extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @OneToOne(type => Users)
  @JoinColumn()
  user_id: Users;

  @OneToOne(type => Plans)
  @JoinColumn()
  plan_id: Plans;

  @CreateDateColumn() 
  createdAt: Date; 
  
  @UpdateDateColumn()
  updatedAt: Date;
}

export { UsersPlans }
