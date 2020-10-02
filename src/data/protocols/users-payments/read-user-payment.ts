
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'

export interface IReadUserPaymentRepository{
  readRow (id:string):Promise<IUsersPaymentsModel> 
}
