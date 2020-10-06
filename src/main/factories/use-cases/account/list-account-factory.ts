
import { ListAccount } from '@data/use-cases/account/list-account/list-account'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'

export const makeListAccountFactory = () => {
  const accountRepository = new Account()
  return new ListAccount(accountRepository)
}
