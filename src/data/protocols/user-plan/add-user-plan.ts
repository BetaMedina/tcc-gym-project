
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export interface IAddUserPlanRepository{
  createRow (student:StudentModel, plan:Plan):Promise<UserPlanModel> 
}
