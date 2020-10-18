import { AccountController } from '@presentation/controllers/account/delete/account-controller'
import { makeDeleteAccountFactory } from '@main/factories/use-cases/account/delete-account-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeDeleteAccountController = () => {
  const loginController = new AccountController(makeDeleteAccountFactory())
  return makeLogErrorDecorator(loginController)
}
