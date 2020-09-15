import { InvalidParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/http/http-helper'
import { Validation } from '@presentation/protocols/validation'
import { UsersPlans } from './users-plans'

interface SutTypes{
  sut:UsersPlans,
  validationSut:Validation
}

const makeSut = ():SutTypes => {
  class ValidatorStub implements Validation {
    validate (input:any):Error {
      return null
    }
  }
  const validationSut = new ValidatorStub()
  const sut = new UsersPlans(validationSut)
  return { sut, validationSut }
}

describe('=== USERS PLANS ===', () => {
  it('Should expected to return error userId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('userId'))

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('Should expected to return error planId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('planId'))

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
})
