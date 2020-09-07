import { badRequest, InvalidParamError, Validation } from './plans-protocols'
import { PlansController } from './plans-controller'
import { AddPlanCase, AddPlanReceived } from '@domain/use-cases/plans/add-plan-db'
import { Plan } from '@domain/models/plans'
import { serverError, successResponse } from '../logIn/login-protocols'

interface SutTypes{
  validatorSut:Validation
  sut:PlansController,
  addPlanSut:AddPlanCase
}

const makeSut = ():SutTypes => {
  class ValidatorStub implements Validation {
    validate (input:any):Error {
      return null
    }
  }
  class AddPlanStub implements AddPlanCase {
    create (account:AddPlanReceived):Promise<Plan> {
      return new Promise(resolve => resolve({
        id: 1,
        name: 'validName',
        price: 99.99,
        duration: '15 dias'
      }))
    }
  }
  
  const validatorSut = new ValidatorStub()
  const addPlanSut = new AddPlanStub()
  const sut = new PlansController(validatorSut, addPlanSut)
  return {
    validatorSut,
    sut,
    addPlanSut
  }
}

describe('=== Plans Controller ===', () => {
  it('Should expected to return error if wrong parameters have been passed', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = {
      body: {
        name: 'invalidName',
        price: 'ValidPrice',
        duration: 'Duration'
      }
    }
    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('name'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')))
  })
  it('Should expected to return error if wrong parameters have been passed', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = {
      body: {
        name: 'ValidPlaneName',
        price: 'invalidPrice',
        duration: 'Duration'
      }
    }
    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('price'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('price')))
  })
  it('Should expected to return error if wrong parameters have been passed', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = {
      body: {
        name: 'ValidPlaneName',
        price: 'ValidPrice',
        duration: 'invalidDuration'
      }
    }
    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('duration'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('duration')))
  })
  it('Should expected to throw if create throw', async () => {
    const { sut, addPlanSut } = makeSut()
    const payload = {
      body: {
        name: 'ValidPlaneName',
        price: 'ValidPrice',
        duration: 'invalidDuration'
      }
    }
    jest.spyOn(addPlanSut, 'create').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should to return success', async () => {
    const { sut } = makeSut()
    const payload = {
      body: {
        name: 'ValidPlaneName',
        price: 'ValidPrice',
        duration: 'invalidDuration'
      }
    }
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(successResponse({
      id: 1,
      name: 'validName',
      price: 99.99,
      duration: '15 dias'
    }))
  })
})
