import { SignUp } from '@presentation/controllers/signUp/signUp-controller'
import { makeSignUpValidation } from './signUp-validation'
import { DbAddAccount } from '@data/use-cases/addAccount-data'
import { AddAccountRepo } from '@infra/db/mysql/typeorm/repository/add-account/add-account-repository'

export const makeSignUpController = () => {
  const repository = new AddAccountRepo()
  const addAccountUseCase = new DbAddAccount(repository)
  return new SignUp(makeSignUpValidation(), addAccountUseCase)
}
