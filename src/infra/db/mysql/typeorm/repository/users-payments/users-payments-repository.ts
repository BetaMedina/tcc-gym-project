
import { IAddUserPaymentRepository } from '@data/protocols/users-payments/add-user-payment'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IAddUserPaymentReceived } from '@domain/use-cases/users-payments/add-users-payments'
import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { Users } from '../../entities/users-entities'
import { UsersPayments } from '../../entities/users-payments'

export class UserPaymentRepository implements IAddUserPaymentRepository {
  async createRow (payload:IAddUserPaymentReceived):Promise<IUsersPaymentsModel> {
    const userPayment = new UsersPayments()
    userPayment.user = payload.user as Users
    userPayment.plan = payload.plan as Plans 
    userPayment.payment_type = payload.paymentType
    userPayment.payment_value = payload.paymentValue
    userPayment.payment_date = payload.paymentDate
    return getRepository(UsersPayments).create(userPayment).save()
  }
}
