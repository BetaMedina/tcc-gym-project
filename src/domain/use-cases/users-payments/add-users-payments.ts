import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'

export interface IAddUserPaymentReceived{
  id?:Number,
  student: Students,
  plan:Plan,
  paymentValue:Number,
  paymentType: String,
  paymentDate: Date
}

export interface IUserPayment{
  create(payload:IAddUserPaymentReceived): Promise<IUsersPaymentsModel>
}
