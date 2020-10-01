import { AddUserPaymentsCase } from '@data/use-cases/user-payments/create/add-user-payments'
import { UserPaymentRepository } from '@infra/db/mysql/typeorm/repository/users-payments/users-payments-repository'

export const makeAddUserPaymentFactory = () => {
  const repository = new UserPaymentRepository()
  return new AddUserPaymentsCase(repository)
}
