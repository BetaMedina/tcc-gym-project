import { InvalidParamError } from '../../errors'
import { EmailValidation } from '../../protocols/email-validation'
import { Validation } from '../../protocols/validation'

export class EmailValidator implements Validation {
  constructor (private readonly fieldName:string, private readonly emailValidator:EmailValidation 
  ) {}
  
  validate (input:any):Error {
    if (!(this.emailValidator.isValid(input[this.fieldName]))) {
      return new InvalidParamError(input[this.fieldName])
    }
  }
}
