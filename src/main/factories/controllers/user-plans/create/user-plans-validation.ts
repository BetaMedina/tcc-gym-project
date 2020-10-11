import { RequiredFields } from '@presentation/helpers/validators'
import { ValidationComposite } from '@presentation/helpers/validators/validation-composite'
import { Validation } from '@presentation/protocols/validation'

export const makeUserPlansValidation = ():ValidationComposite => {
  const validations:Validation[] = []

  for (const field of ['studentId', 'planId']) {
    validations.push(new RequiredFields(field))
  }

  return new ValidationComposite(validations)
}
