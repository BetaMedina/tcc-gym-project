import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RestrictFields implements Validation {
  constructor (private readonly objectValidate:any) {}
  
  validate (input:any):Error {
    const inputKeys = Object.keys(input).sort()
    const difference = inputKeys.filter(inptKey => !this.objectValidate.includes(inptKey))
      .concat(this.objectValidate.filter(inptKey => !inputKeys.includes(inptKey)))
      
    if (difference.length) {
      return new InvalidParamError(difference.join(','))
    }
  }
}
