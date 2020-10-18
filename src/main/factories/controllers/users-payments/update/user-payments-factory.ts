import { UpdateUsersPayments } from '@presentation/controllers/usersPayments/update/user-payments'
import { makeUserPaymentsValidation } from './user-payments-validation'
import { makeReadAccountbyIdFactory } from '@main/factories/use-cases/account/find-account-id-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeUpdateUserPaymentFactory } from '@main/factories/use-cases/users-payments/update-user-payments-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUpdateUserPaymentsController = () => {
  const controller = new UpdateUsersPayments(makeUserPaymentsValidation(), makeReadAccountbyIdFactory(), makeReadPlanFactory(), makeUpdateUserPaymentFactory())

  return makeLogErrorDecorator(controller)
}
