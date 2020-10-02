import { UpdateUsersPayments } from '@presentation/controllers/usersPayments/update/user-payments'
import { makeUserPaymentsValidation } from './user-payments-validation'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeUpdateUserPaymentFactory } from '@main/factories/use-cases/users-payments/update-user-payments-factory'

export const makeUpdateUserPaymentsController = () => {
  const controller = new UpdateUsersPayments(makeUserPaymentsValidation(), makeReadAccountbyIdFactory(), makeReadPlanFactory(), makeUpdateUserPaymentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(controller, logRepository)
}
