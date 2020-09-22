import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'

export interface IListUserPlanModel{
  id:Number,
  user:UserAccount,
  plan:Plan
}
