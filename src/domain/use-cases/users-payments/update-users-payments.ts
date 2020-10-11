import { Plan } from '@domain/models/plans/plans'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'

export interface IUpdateUserPaymentReceived{
  student:Students,
  plan:Plan,
  paymentValue:Number,
  paymentType: String,
  paymentDate: Date
}

export interface IUpdateUserPayment{
  update (payload:IUpdateUserPaymentReceived):Promise<boolean> 
}
