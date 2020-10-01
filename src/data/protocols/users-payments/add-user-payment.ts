import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IAddUserPaymentReceived } from '@domain/use-cases/users-payments/add-users-payments'

export interface IAddUserPaymentRepository{
  createRow (payload:IAddUserPaymentReceived):Promise<IUsersPaymentsModel> 
}
