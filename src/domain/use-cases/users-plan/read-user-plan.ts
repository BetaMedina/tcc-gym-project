import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export interface IReadUsersPlans{
  find(id:string):Promise<UserPlanModel>
}
