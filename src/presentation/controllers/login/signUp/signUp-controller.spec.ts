import { ServerError } from '@presentation/errors'

import { MissingParamError } from '@presentation/errors/missingParam-error'
import { SignUp } from './signUp-controller'
import { Validation, AddAccountRepository } from './signUp-protocols'
import { AddAccountStub, ValidatorStub } from '@presentation/tests'
import { mockSignUpPostRequest } from '@presentation/tests/requests'

export interface SutTypes{
  sut:SignUp,
  validatorStub:Validation
  addAccountStub:AddAccountRepository
}

const makeSut = (): SutTypes => {
  const validatorStub = new ValidatorStub()
  const addAccountStub = new AddAccountStub()
  const sut = new SignUp(validatorStub, addAccountStub)
  return {
    sut,
    validatorStub,
    addAccountStub
  }
}

describe('=== SignUpController TESTS ===', () => {
  it('Should be throw if validate  throw', async () => {
    const { sut, validatorStub } = makeSut()
    
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = mockSignUpPostRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('Should be return error if validate report error', async () => {
    const { sut, validatorStub } = makeSut()
     
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => { return new MissingParamError('password') })
      
    const payload = mockSignUpPostRequest()
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  it('Should be throw if add account throw', async () => {
    const { sut, addAccountStub } = makeSut()
    
    jest.spyOn(addAccountStub, 'create').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = mockSignUpPostRequest()
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('Should be return success', async () => {
    const { sut } = makeSut()
    
    const payload = mockSignUpPostRequest()
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('User created with success')
  })
})
