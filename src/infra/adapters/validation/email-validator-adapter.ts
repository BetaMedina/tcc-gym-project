import { EmailValidation } from '../../../presentation/protocols/email-validation'
import validator from 'validator'
export class EmailValidatorAdapter implements EmailValidation {
  isValid (email:string):boolean {
    return validator.isEmail(email)
  }
}
