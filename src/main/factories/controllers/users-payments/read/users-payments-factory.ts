import { ReadUsersPayments } from '@presentation/controllers/usersPayments/read/users-payments'
import { makeReadUserPaymentFactory } from '@main/factories/use-cases/users-payments/read-user-payment-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeReadUserPaymentsController = () => {
  const controller = new ReadUsersPayments(makeReadUserPaymentFactory())

  return makeLogErrorDecorator(controller)
}
