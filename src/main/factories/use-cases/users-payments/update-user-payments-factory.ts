import { UpdateUserPaymentCase } from '@data/use-cases/user-payments/update/update-user-payment'
import { UserPaymentRepository } from '@infra/db/mysql/typeorm/repository/users-payments/users-payments-repository'

export const makeUpdateUserPaymentFactory = () => {
  const repository = new UserPaymentRepository()
  return new UpdateUserPaymentCase(repository)
}
