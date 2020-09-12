import { LoginController } from '@presentation/controllers/logIn/login-controller'
import { AuthenticationData } from '@data/use-cases/account/authenticate/authenticate-data'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import { makeLogInValidation } from './login-validation'
import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt/bcrypt-adapter'

import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'

export const makeLogInController = () => {
  const account = new Account()
  const bcryptAdapter = new BcrypAdapter()
  const jwtAdapter = new JsonWebTokenAdapter()
  const authenticated = new AuthenticationData(bcryptAdapter, account, jwtAdapter)

  const logRepository = new LogMongoRepository() 
  const loginController = new LoginController(makeLogInValidation(), authenticated)

  return new LogErrorDecorator(loginController, logRepository)
}
