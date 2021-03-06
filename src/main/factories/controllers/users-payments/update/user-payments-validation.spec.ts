import { ValidationComposite, RequiredFields, RestrictFields } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'
import { makeUserPaymentsValidation } from './user-payments-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('LogIn Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    makeUserPaymentsValidation()
    const validations:Validation[] = []
    for (const field of ['studentId', 'planId', 'paymentType', 'paymentValue', 'paymentDate']) {
      validations.push(new RequiredFields(field))
    }

    validations.push(new RestrictFields(['studentId', 'planId', 'paymentType', 'paymentValue', 'paymentDate']))

    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
