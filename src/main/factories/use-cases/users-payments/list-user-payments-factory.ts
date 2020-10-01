import { ListUserPayments } from '@data/use-cases/user-payments/list/list-user-payment'
import { UserPaymentRepository } from '@infra/db/mysql/typeorm/repository/users-payments/users-payments-repository'

export const makeListUserPaymentFactory = () => {
  const repository = new UserPaymentRepository()
  return new ListUserPayments(repository)
}
