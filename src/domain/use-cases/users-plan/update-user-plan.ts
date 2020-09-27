import { UserAccount } from '@domain/models/account/use-account'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { Plan } from '@domain/models/plans/plans'

export interface IUpdateUserPlan{
  update (id:number, user:UserAccount, plan:Plan):Promise<UserPlanModel> 
}
