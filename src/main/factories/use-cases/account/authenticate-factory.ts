import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt/bcrypt-adapter'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { AuthenticationData } from '@data/use-cases/account/authenticate/authenticate-data'

export const makeAuthenticateFactory = () => {
  const account = new Account()
  const bcryptAdapter = new BcrypAdapter()
  const jwtAdapter = new JsonWebTokenAdapter()
  return new AuthenticationData(bcryptAdapter, account, jwtAdapter)
}
