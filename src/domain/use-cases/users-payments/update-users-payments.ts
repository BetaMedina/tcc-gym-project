import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'

export interface IUpdateUserPaymentReceived{
  user:UserAccount, 
  plan:Plan,
  paymentValue:Number,
  paymentType: String,
  paymentDate: Date
}

export interface IUpdateUserPayment{
  update (payload:IUpdateUserPaymentReceived):Promise<boolean> 
}
