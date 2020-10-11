
import { DbLoadAccountById } from '@data/use-cases/account/load-account-id/load-account-id'
import { Account } from '@infra/db/mysql/typeorm/repository/student/students-repository'

export const makeReadAccountbyIdFactory = () => {
  const accountRepository = new Account()
  return new DbLoadAccountById(accountRepository)
}
