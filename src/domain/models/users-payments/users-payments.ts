import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'
import { Plan } from '../plans/plans'
import { StudentModel } from '../student/student'

export interface IUsersPaymentsModel{
  id:Number,
  student:StudentModel,
  plan:Plan,
  payment_value:Number,
  payment_type: String,
  payment_date: Date,
  is_active?: Boolean,
  start_date?: Date,
  createdAt?:Date,
  updatedAt?:Date,
}
