import { UsersPayments } from '@presentation/controllers/usersPayments/create/users-payments'
import { makeUserPaymentsValidation } from './users-payments-validation'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeAddUserPaymentFactory } from '@main/factories/use-cases/users-payments/add-user-payments-factory'

export const makeUserPaymentsController = () => {
  const controller = new UsersPayments(makeUserPaymentsValidation(), makeReadAccountbyIdFactory(), makeReadPlanFactory(), makeAddUserPaymentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(controller, logRepository)
}
