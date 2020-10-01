import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'

export interface IListUserPaymentRepository{
  listRows ():Promise<IUsersPaymentsModel[]> 
}
