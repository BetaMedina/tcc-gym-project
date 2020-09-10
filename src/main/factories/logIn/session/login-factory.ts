import { LoginController } from '@presentation/controllers/logIn/login-controller'
import { AuthenticationData } from '@data/use-cases/account/authenticate/authenticate-data'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import { makeLogInValidation } from './login-validation'
import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt/bcrypt-adapter'

export const makeLogInController = () => {
  const account = new Account()
  const bcryptAdapter = new BcrypAdapter()
  const jwtAdapter = new JsonWebTokenAdapter()
  const authenticated = new AuthenticationData(bcryptAdapter, account, jwtAdapter)
  return new LoginController(makeLogInValidation(), authenticated)
}
