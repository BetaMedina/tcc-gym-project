import { RequiredFields, EmailValidator } from '@presentation/helpers/validators'
import { ValidationComposite } from '@presentation/helpers/validators/validation-composite'
import { Validation } from '@presentation/protocols/validation'
import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'

export const makeLogInValidation = ():ValidationComposite => {
  const validations:Validation[] = []
  const emailValidator:EmailValidatorAdapter = new EmailValidatorAdapter()
  
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFields(field))
  }
  validations.push(new EmailValidator('email', emailValidator))

  return new ValidationComposite(validations)
}
