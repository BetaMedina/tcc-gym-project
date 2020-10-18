import { ListAccountController } from '@presentation/controllers/account/list/account-controller'
import { makeListAccountFactory } from '@main/factories/use-cases/account/list-account-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeListAccountController = () => {
  const loginController = new ListAccountController(makeListAccountFactory())
  return makeLogErrorDecorator(loginController)
}
