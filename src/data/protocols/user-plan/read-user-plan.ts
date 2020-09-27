
import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export interface IReadUserPlanRepository{
  readRow (id:string):Promise<UserPlanModel> 
}
