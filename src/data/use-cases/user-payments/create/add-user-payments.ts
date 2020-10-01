import { IAddUserPaymentRepository } from '@data/protocols/users-payments/add-user-payment'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IAddUserPaymentReceived, IUserPayment } from '@domain/use-cases/users-payments/add-users-payments'

export class AddUserPaymentsCase implements IUserPayment {
  constructor (private readonly addUserPayment: IAddUserPaymentRepository) {}
  async create (payload: IAddUserPaymentReceived):Promise<IUsersPaymentsModel> {
    return this.addUserPayment.createRow(payload)
  }
}
