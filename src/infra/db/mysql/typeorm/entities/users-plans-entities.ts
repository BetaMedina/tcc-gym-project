import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column
} from 'typeorm'
import { Plans } from './plans-entities'
import { Users } from './users-entities'

@Entity('users_plans')
class UsersPlans extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @OneToOne(type => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;
  
  @ManyToOne(type => Plans, { onDelete: 'CASCADE' })
  @JoinColumn()
  plan: Plans;

  @Column('boolean', { default: true })
  is_active: boolean;

  @CreateDateColumn() 
  start_date: Date; 

  @CreateDateColumn() 
  createdAt: Date; 
  
  @UpdateDateColumn()
  updatedAt: Date;
}

export { UsersPlans }
