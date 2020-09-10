import { ValidationComposite, RequiredFields, EmailValidator } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'
import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'
import { makeLogInValidation } from './login-validation'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('LogIn Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    const emailValidator = new EmailValidatorAdapter()

    makeLogInValidation()
    const validations:Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFields(field))
    }
    validations.push(new EmailValidator('email', emailValidator))

    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
