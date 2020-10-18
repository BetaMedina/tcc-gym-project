import { LoginController } from '@presentation/controllers/login/logIn/login-controller'
import { makeLogInValidation } from './login-validation'
import { makeAuthenticateFactory } from '@main/factories/use-cases/account/authenticate-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeLogInController = () => {
  const loginController = new LoginController(makeLogInValidation(), makeAuthenticateFactory())

  return makeLogErrorDecorator(loginController)
}
