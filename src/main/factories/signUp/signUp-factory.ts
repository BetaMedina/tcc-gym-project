import { SignUp } from '@presentation/controllers/signUp/signUp-controller'
import { makeSignUpValidation } from './signUp-validation'
import { DbAddAccount } from '@data/use-cases/addAccount-data'
import { AddAccountRepo } from '@infra/db/mysql/typeorm/repository/add-account/add-account-repository'
import { BcrypAdapter } from '@infra/adapters/cryptography/bcrypt-adapter'

export const makeSignUpController = () => {
  const repository = new AddAccountRepo()
  const bcryptAdapter = new BcrypAdapter()
  const addAccountUseCase = new DbAddAccount(repository, bcryptAdapter)
  return new SignUp(makeSignUpValidation(), addAccountUseCase)
}
