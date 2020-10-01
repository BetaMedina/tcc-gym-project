import { IListUserPaymentRepository } from '@data/protocols/users-payments/list-user-payments'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IListUsersPayments } from '@domain/use-cases/users-payments/list-users-payments'

export class ListUserPayments implements IListUsersPayments {
  constructor (private readonly listPlanRepository:IListUserPaymentRepository) {}
  list ():Promise<IUsersPaymentsModel[]> {
    return this.listPlanRepository.listRows()
  }
}
