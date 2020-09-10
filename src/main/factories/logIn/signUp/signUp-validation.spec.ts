import { ValidationComposite, RequiredFields, CompareFields, EmailValidator } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'
import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    const emailValidator = new EmailValidatorAdapter()

    makeSignUpValidation()
    const validations:Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFields(field))
    }

    validations.push(new CompareFields('password', 'passwordConfirm'))
    validations.push(new EmailValidator('email', emailValidator))

    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
