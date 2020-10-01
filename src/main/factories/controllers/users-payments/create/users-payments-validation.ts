import { RequiredFields, RestrictFields } from '@presentation/helpers/validators'
import { ValidationComposite } from '@presentation/helpers/validators/validation-composite'
import { Validation } from '@presentation/protocols/validation'

export const makeUserPaymentsValidation = ():ValidationComposite => {
  const validations:Validation[] = []

  for (const field of ['userId', 'planId', 'paymentType', 'paymentValue', 'paymentDate']) {
    validations.push(new RequiredFields(field))
  }
  validations.push(new RestrictFields(['userId', 'planId', 'paymentType', 'paymentValue', 'paymentDate']))

  return new ValidationComposite(validations)
}
