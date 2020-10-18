import { ListUsersPayments } from '@presentation/controllers/usersPayments/list/users-payments'
import { makeListUserPaymentFactory } from '@main/factories/use-cases/users-payments/list-user-payments-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeListUserPaymentsController = () => {
  const controller = new ListUsersPayments(makeListUserPaymentFactory())

  return makeLogErrorDecorator(controller)
}
