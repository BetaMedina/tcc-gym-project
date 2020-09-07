import { SignUp } from '@presentation/controllers/signUp/signUp-controller'
import { makeSignUpValidation } from './signUp-validation'
import { DbAddAccount } from '@data/use-cases/account/add-account/addAccount-data'
import { Account } from '@infra/db/mysql/typeorm/repository/Account/account-repository'
import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt/bcrypt-adapter'

export const makeSignUpController = () => {
  const repository = new Account()
  const bcryptAdapter = new BcrypAdapter()
  const addAccountUseCase = new DbAddAccount(repository, bcryptAdapter)
  return new SignUp(makeSignUpValidation(), addAccountUseCase)
}
