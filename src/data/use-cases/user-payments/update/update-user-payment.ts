import { IUpdateUserPaymentRepository } from '@data/protocols/users-payments/update-user-payment'
import { IUpdateUserPayment, IUpdateUserPaymentReceived } from '@domain/use-cases/users-payments/update-users-payments'

export class UpdateUserPaymentCase implements IUpdateUserPayment {
  constructor (private readonly updateUserPaymentRepository: IUpdateUserPaymentRepository) {}
  async update (payload:IUpdateUserPaymentReceived):Promise<boolean> {
    return !!this.updateUserPaymentRepository.updateRow(payload)
  }
}
