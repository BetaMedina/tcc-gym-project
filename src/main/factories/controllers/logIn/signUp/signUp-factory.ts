import { SignUp } from '@presentation/controllers/login/signUp/signUp-controller'
import { makeSignUpValidation } from './signUp-validation'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'
import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { makeAddAccountFactory } from '@main/factories/use-cases/account/add-account-factory'

export const makeSignUpController = () => {
  const signUpController = new SignUp(makeSignUpValidation(), makeAddAccountFactory())
  const logRepository = new LogMongoRepository()

  return new LogErrorDecorator(signUpController, logRepository)
}
