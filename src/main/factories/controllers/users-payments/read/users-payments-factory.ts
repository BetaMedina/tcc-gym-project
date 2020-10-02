import { ReadUsersPayments } from '@presentation/controllers/usersPayments/read/users-payments'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeReadUserPaymentFactory } from '@main/factories/use-cases/users-payments/read-user-payment-factory'

export const makeReadUserPaymentsController = () => {
  const controller = new ReadUsersPayments(makeReadUserPaymentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(controller, logRepository)
}
