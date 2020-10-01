import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
export interface IListUsersPayments{
  list():Promise<IUsersPaymentsModel[]>
}
