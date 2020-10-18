import { UserAccount } from '@domain/models/account/user-account'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plan } from '@domain/models/plans/plans'
import { StudentModel } from '@domain/models/student/student'

export interface IUpdateUserPlan{
  update (id:number, student:StudentModel, plan:Plan, date?:Date):Promise<UserPlanModel> 
}
