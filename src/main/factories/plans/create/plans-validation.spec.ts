import { ValidationComposite, RequiredFields } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'

import { makePlanValidation } from './plans-validation'

jest.mock('../../../../presentation/helpers/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    makePlanValidation()
    const validations:Validation[] = []
    for (const field of ['name', 'price', 'duration']) {
      validations.push(new RequiredFields(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
