import { UserAccount } from '../account/use-account'
import { Plan } from '../plans/plans'

export interface UserPlanModel{
  id:Number,
  user:UserAccount,
  userId?:Number,
  planId?:Number,
  plan:Plan,
  updatedAt?:Date
}
