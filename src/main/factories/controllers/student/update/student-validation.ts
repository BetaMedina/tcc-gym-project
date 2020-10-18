import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'
import { EmailValidator, RequiredFields, RestrictFields } from '@presentation/helpers/validators'
import { ValidationComposite } from '@presentation/helpers/validators/validation-composite'
import { Validation } from '@presentation/protocols/validation'

export const makeStudentValidation = ():ValidationComposite => {
  const validations:Validation[] = []
  const emailValidator = new EmailValidatorAdapter()

  const acceptedFields = [
    'name',
    'email',
    'age',
    'height',
    'weigth'
  ]

  for (const field of acceptedFields) {
    validations.push(new RequiredFields(field))
  }
  validations.push(new EmailValidator('email', emailValidator))

  validations.push(new RestrictFields(acceptedFields))

  return new ValidationComposite(validations)
}
