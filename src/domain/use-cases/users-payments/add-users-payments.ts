import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'

export interface IAddUserPaymentReceived{
  user:UserAccount, 
  plan:Plan,
  paymentValue:Number,
  paymentType: String,
  paymentDate: Date
}

export interface IUserPayment{
  create(payload:IAddUserPaymentReceived): Promise<IUsersPaymentsModel>
}
