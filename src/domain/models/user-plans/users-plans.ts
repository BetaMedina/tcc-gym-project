import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'
import { UserAccount } from '../account/user-account'
import { Plan } from '../plans/plans'
import { StudentModel } from '../student/student'

export interface UserPlanModel{
  id:Number,
  student: StudentModel,
  studentId?:Number,
  planId?:Number,
  plan:Plan,
  updatedAt?:Date
}
