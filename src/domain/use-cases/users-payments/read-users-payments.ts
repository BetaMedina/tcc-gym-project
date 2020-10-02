import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'

export interface IReadUsersPayment{
  find(id:string):Promise<IUsersPaymentsModel>
}
