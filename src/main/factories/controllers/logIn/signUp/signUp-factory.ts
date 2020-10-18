import { SignUp } from '@presentation/controllers/login/signUp/signUp-controller'
import { makeSignUpValidation } from './signUp-validation'
import { makeAddAccountFactory } from '@main/factories/use-cases/account/add-account-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeSignUpController = () => {
  const signUpController = new SignUp(makeSignUpValidation(), makeAddAccountFactory())
  return makeLogErrorDecorator(signUpController)
}
