import { InvalidParamError, ServerError } from '../../errors'
import { AddAccount, AddAccountReceived } from '../../../data/protocols/add-account'

import { MissingParamError } from '../../errors/missingParam-error'
import { EmailValidation } from '../../protocols/email-validation'
import { SignUp } from './signUp-controller'
import { UserAccount } from '../../../domain/models/use-account'
import { Validation } from './signUp-protocols'

// class EmailValidationStub
class ValidatorStub implements Validation {
  validate (input:any):Error {
    return null
  }
}

class AddAccountStub implements AddAccount {
  create (payload:AddAccountReceived):Promise<UserAccount> {
    return new Promise(resolve => resolve({ ...payload, id: 'valid_id' }))
  }
}

export interface SutTypes{
  sut:SignUp,
  validatorStub:ValidatorStub
  addAccountStub:AddAccountStub
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
    
    const payload = {
      body: {
        password: 'validPassword',
        name: 'validName',
        email: 'notvalid@email.com',
        confirmPassword: 'validPassword'
      }
    }
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('Should be return error if validate report error', async () => {
    const { sut, validatorStub } = makeSut()
     
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => { return new MissingParamError('password') })
    
    const payload = {
      body: {
        password: '',
        name: 'validName',
        email: 'notvalid@email.com',
        confirmPassword: 'validPassword'
      }
    }
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  it('Should be throw if add account throw', async () => {
    const { sut, addAccountStub } = makeSut()
    
    jest.spyOn(addAccountStub, 'create').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = {
      body: {
        password: 'validPassword',
        name: 'validName',
        email: 'notvalid@email.com',
        confirmPassword: 'validPassword'
      }
    }
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError('any_error'))
  })
  it('Should be return success', async () => {
    const { sut } = makeSut()
    
    const payload = {
      body: {
        password: 'validPassword',
        name: 'validName',
        email: 'notvalid@email.com',
        confirmPassword: 'validPassword'
      }
    }
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('User created with success')
  })
})
