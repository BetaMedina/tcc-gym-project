import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { Plan } from '../plans/plans'

export interface IUsersPaymentsModel{
  id:Number,
  user:Users,
  plan:Plan,
  payment_value:Number,
  payment_type: String,
  payment_date: Date,
  is_active?: Boolean,
  start_date?: Date,
  createdAt?:Date,
  updatedAt?:Date,
}
