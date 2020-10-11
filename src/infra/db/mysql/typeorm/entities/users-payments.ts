import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  Column
} from 'typeorm'
import { Plans } from './plans-entities'
import { Students } from './students-entities'

@Entity('users_payments')
class UsersPayments extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @ManyToOne(type => Students, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: Students;
  
  @ManyToOne(type => Plans, { onDelete: 'CASCADE' })
  @JoinColumn()
  plan: Plans;

  @Column({ type: 'float', precision: 10, scale: 2 })
  payment_value:Number

  @Column('varchar')
  payment_type:String

  @CreateDateColumn() 
  payment_date: Date; 

  @CreateDateColumn() 
  createdAt: Date; 
  
  @UpdateDateColumn()
  updatedAt: Date;
}

export { UsersPayments }
