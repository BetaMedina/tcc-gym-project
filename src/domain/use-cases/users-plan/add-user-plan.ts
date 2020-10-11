import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'

export interface AddUserPlan{
  create (student:StudentModel, plan:Plan):Promise<UserPlanModel> 
}
