import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export interface UserPlanReceveid{
  userId:Number
  planId:Number
}

export interface AddUserPlan{
  create (user:any, plan:any):Promise<UserPlanModel> 
}
