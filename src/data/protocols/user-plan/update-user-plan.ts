
import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'

export interface IUpdateUserPlanRepository{
  updateRow (id:number, user:UserAccount, plan:Plan):Promise<UserPlanModel> 
}
