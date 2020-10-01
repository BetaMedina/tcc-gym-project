import { ListUsersPayments } from '@presentation/controllers/usersPayments/list/users-payments'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeListUserPaymentFactory } from '@main/factories/use-cases/users-payments/list-user-payments-factory'

export const makeListUserPaymentsController = () => {
  const controller = new ListUsersPayments(makeListUserPaymentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(controller, logRepository)
}
