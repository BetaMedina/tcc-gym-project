import { Validation } from '@presentation/protocols/validation'

export class ValidatorStub implements Validation {
  validate (input:any):Error {
    return null
  }
}
