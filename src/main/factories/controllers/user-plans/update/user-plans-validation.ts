import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'
import { EmailValidator, RequiredFields, RestrictFields } from '@presentation/helpers/validators'
import { ValidationComposite } from '@presentation/helpers/validators/validation-composite'
import { Validation } from '@presentation/protocols/validation'

export const makeUserPlansValidation = ():ValidationComposite => {
  const validations:Validation[] = []

  for (const field of ['id', 'studentId', 'planId']) {
    validations.push(new RequiredFields(field))
  }

  validations.push(new RestrictFields(['id', 'studentId', 'planId', 'startDate']))

  return new ValidationComposite(validations)
}
