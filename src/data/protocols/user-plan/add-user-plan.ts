import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { UserPlanReceveid } from '@domain/use-cases/users-plan/add-user-plan'

export interface AddUserPlanRepository{
  createRow (user:any, plan:any):Promise<UserPlanModel> 
}
