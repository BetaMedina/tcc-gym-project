import { AuthMiddleware } from '@presentation/middlewares/auth'
import { DbLoadAccountByToken } from '@data/use-cases/account/load-account-token/load-account-token'
import { JsonWebTokenAdapter } from '@infra/adapters/cryptography/jsonwebtoken/jwt-adapter'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'

export const makeAuthMiddleware = (admin?:boolean) => {
  const repository = new Account()
  const cryptography = new JsonWebTokenAdapter()
  const serviceAccount = new DbLoadAccountByToken(cryptography, repository)
  return new AuthMiddleware(serviceAccount, admin)
}
