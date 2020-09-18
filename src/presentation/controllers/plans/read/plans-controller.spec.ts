import { FindPlanCase } from '@domain/use-cases/plans/find-plan-db'
import { InvalidParamError } from '@presentation/errors'
import { invalidParam, serverError } from '@presentation/helpers/http/http-helper'
import { FindPlanCaseStub } from '@presentation/tests'
import { PlansController } from './plans-controller'
import { mockPlanReadRequest } from '@presentation/tests/requests'
interface SutTypes{
  findPlanSut : FindPlanCase
  sut : PlansController
}

const makeSut = ():SutTypes => {
  const findPlanSut = new FindPlanCaseStub()
  const sut = new PlansController(findPlanSut)
  return {
    findPlanSut,
    sut
  }
}

describe('=== Plans Read ===', () => {
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

  it('It is expected to receive a plan and update it ', async () => {
    const { sut } = makeSut()
    const payload = mockPlanReadRequest()
    const httpResponse = await sut.handle(payload)

    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.name).toBeTruthy()
    expect(httpResponse.body.price).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
  })
})
