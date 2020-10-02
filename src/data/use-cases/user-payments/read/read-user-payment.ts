import { IReadUserPaymentRepository } from '@data/protocols/users-payments/read-user-payment'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IReadUsersPayment } from '@domain/use-cases/users-payments/read-users-payments'

export class ReadUserPayment implements IReadUsersPayment {
  constructor (
    private readonly findUserPaymentRepo : IReadUserPaymentRepository
  ) {}

  async find (id:string):Promise<IUsersPaymentsModel> {
    return this.findUserPaymentRepo.readRow(id)
  }
} 
