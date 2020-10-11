import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '../student/student'

export interface IListUserPlanModel{
  id:Number,
  student:StudentModel,
  plan:Plan
}
