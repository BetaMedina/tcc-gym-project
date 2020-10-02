
import { IAddUserPaymentRepository } from '@data/protocols/users-payments/add-user-payment'
import { IListUserPaymentRepository } from '@data/protocols/users-payments/list-user-payments'
import { IUpdateUserPaymentRepository } from '@data/protocols/users-payments/update-user-payment'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IAddUserPaymentReceived, IUserPayment } from '@domain/use-cases/users-payments/add-users-payments'
import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { Users } from '../../entities/users-entities'
import { UsersPayments } from '../../entities/users-payments'

export class UserPaymentRepository implements IAddUserPaymentRepository, IListUserPaymentRepository, IUpdateUserPaymentRepository {
  async createRow (payload:IAddUserPaymentReceived):Promise<IUsersPaymentsModel> {
    const userPayment = new UsersPayments()
    userPayment.user = payload.user as Users
    userPayment.plan = payload.plan as Plans 
    userPayment.payment_type = payload.paymentType
    userPayment.payment_value = payload.paymentValue
    userPayment.payment_date = payload.paymentDate
    return getRepository(UsersPayments).create(userPayment).save()
  }

  async listRows ():Promise<IUsersPaymentsModel[]> {
    return getRepository(UsersPayments).find({ relations: ['user', 'plan'] })
  }

  async updateRow (payload:IAddUserPaymentReceived):Promise<boolean> {
    const userPayment = new UsersPayments()
    userPayment.id = payload.id
    userPayment.user = payload.user as Users
    userPayment.plan = payload.plan as Plans 
    userPayment.payment_type = payload.paymentType
    userPayment.payment_value = payload.paymentValue
    userPayment.payment_date = payload.paymentDate
    return !!getRepository(UsersPayments).save(userPayment)
  }
}
