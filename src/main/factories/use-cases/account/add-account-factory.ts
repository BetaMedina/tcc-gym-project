import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt/bcrypt-adapter'
import { DbAddAccount } from '@data/use-cases/account/add-account/addAccount-data'

export const makeAddAccountFactory = () => {
  const repository = new Account()
  const bcryptAdapter = new BcrypAdapter()
  return new DbAddAccount(repository, bcryptAdapter)
}
