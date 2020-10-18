import { UsersPayments } from '@presentation/controllers/usersPayments/create/users-payments'
import { makeUserPaymentsValidation } from './users-payments-validation'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeAddUserPaymentFactory } from '@main/factories/use-cases/users-payments/add-user-payments-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUserPaymentsController = () => {
  const controller = new UsersPayments(makeUserPaymentsValidation(), makeReadAccountbyIdFactory(), makeReadPlanFactory(), makeAddUserPaymentFactory())

  return makeLogErrorDecorator(controller)
}
