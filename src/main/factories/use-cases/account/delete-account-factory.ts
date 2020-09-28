import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { DeleteAccount } from '@data/use-cases/account/delete-account/delete-account'

export const makeDeleteAccountFactory = () => {
  const repository = new Account()
  return new DeleteAccount(repository)
}
