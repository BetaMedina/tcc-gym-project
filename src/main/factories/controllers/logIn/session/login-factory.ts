import { LoginController } from '@presentation/controllers/login/logIn/login-controller'
import { makeLogInValidation } from './login-validation'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeAuthenticateFactory } from '@main/factories/use-cases/account/authenticate-factory'

export const makeLogInController = () => {
  const logRepository = new LogMongoRepository() 
  const loginController = new LoginController(makeLogInValidation(), makeAuthenticateFactory())

  return new LogErrorDecorator(loginController, logRepository)
}
