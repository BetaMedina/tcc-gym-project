import { ValidationComposite, RequiredFields } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'
import { makeUserPlansValidation } from './user-plans-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('LogIn Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    makeUserPlansValidation()
    const validations:Validation[] = []
    for (const field of ['userId', 'planId']) {
      validations.push(new RequiredFields(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
