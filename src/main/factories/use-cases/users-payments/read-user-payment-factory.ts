import { ReadUserPayment } from '@data/use-cases/user-payments/read/read-user-payment'
import { UserPaymentRepository } from '@infra/db/mysql/typeorm/repository/users-payments/users-payments-repository'

export const makeReadUserPaymentFactory = () => {
  const repository = new UserPaymentRepository()
  return new ReadUserPayment(repository)
}
