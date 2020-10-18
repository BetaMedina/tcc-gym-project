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
