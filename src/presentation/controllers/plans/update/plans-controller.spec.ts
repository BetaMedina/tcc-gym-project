import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { UpdatePlanCase } from '@domain/use-cases/plans/update-plan-db'
import { InvalidParamError } from '@presentation/errors'
import { invalidParam, serverError } from '@presentation/helpers/http/http-helper'
import { FindPlanCaseStub, UpdatePlanCaseStub } from '@presentation/tests'
import { mockPlanReadRequest, mockPlanPutRequest } from '@presentation/tests/requests'
import { PlansController } from './plans-controller'

interface SutTypes{
  findPlanSut : FindPlanCase
  updatePlanSut : UpdatePlanCase
  sut : PlansController
}

const makeSut = ():SutTypes => {
  const findPlanSut = new FindPlanCaseStub()
  const updatePlanSut = new UpdatePlanCaseStub()
  const sut = new PlansController(findPlanSut, updatePlanSut)
  return {
    findPlanSut,
    updatePlanSut,
    sut
  }
}

describe('=== Plans Update ===', () => {
  it('It is expected to receive a wrong plan and return http error ', async () => {
    const { sut, findPlanSut } = makeSut()
    jest.spyOn(findPlanSut, 'find').mockReturnValue(null)
    const httpResponse = await sut.handle(mockPlanReadRequest())
    
    expect(httpResponse).toEqual(invalidParam(new InvalidParamError('Plan not exist')))
  })
  it('It is expected to receive a wrong plan and return http error ', async () => {
    const { sut, findPlanSut } = makeSut()
    jest.spyOn(findPlanSut, 'find').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = mockPlanReadRequest() 

    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('It is expected to throw if update throws ', async () => {
    const { sut, updatePlanSut } = makeSut()
    jest.spyOn(updatePlanSut, 'update').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = mockPlanPutRequest()
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('It is expected to receive a plan and update it ', async () => {
    const { sut } = makeSut()
    
    const payload = mockPlanPutRequest() 
    const httpResponse = await sut.handle(payload)

    expect(httpResponse.body).toEqual('user has been updated')
  })
})
