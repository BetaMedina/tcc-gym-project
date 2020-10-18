import { EmailValidatorAdapter } from '@infra/adapters/validation/email-validator-adapter'
import { ValidationComposite, RequiredFields, RestrictFields, EmailValidator } from '@presentation/helpers/validators'

import { Validation } from '@presentation/protocols/validation'
import { makeStudentValidation } from './student-validation'

jest.mock('../../../../../presentation/helpers/validators/validation-composite')

describe('LogIn Validation Factory', () => {
  it('Should call ValidationComposite with all correct values', () => {
    makeStudentValidation()
    const emailValidator = new EmailValidatorAdapter()
    const acceptedFields = [
      'name',
      'email',
      'age',
      'height',
      'weigth'
    ]
    
    const validations:Validation[] = []
    for (const field of acceptedFields) {
      validations.push(new RequiredFields(field))
    }
    
    validations.push(new EmailValidator('email', emailValidator))
    
    validations.push(new RestrictFields(acceptedFields))

    expect(ValidationComposite).toHaveBeenCalledWith(validations) 
  })
})
