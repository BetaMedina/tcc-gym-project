import { Plan } from '@domain/models/plans/plans'
import { FindPlanCase, findPlanReceived } from '@domain/use-cases/plans/find-plan-db'
import { UpdatePlanCase, UpdatePlanReceived } from '@domain/use-cases/plans/update-plan-db'
import { InvalidParamError } from '@presentation/errors'
import { invalidParam, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { PlansController } from './plans-controller'

interface SutTypes{
  findPlanSut : FindPlanCase
  sut : PlansController
}

class FindPlanCaseStub implements FindPlanCase {
  async find (payload:findPlanReceived):Promise<Plan> {
    return {
      id: 1,
      name: 'validPlan',
      price: 99,
      duration: '3 meses'
    }
  }
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
    const httpResponse = await sut.handle({
      params: { id: 1 }
    })
    
    expect(httpResponse).toEqual(invalidParam(new InvalidParamError('Plan not exist')))
  })
  it('It is expected to receive a wrong plan and return http error ', async () => {
    const { sut, findPlanSut } = makeSut()
    jest.spyOn(findPlanSut, 'find').mockImplementationOnce(() => { throw new Error('any_error') })
    
    const payload = {
      params: {
        id: 1
      }
    } 
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })

  it('It is expected to receive a plan and update it ', async () => {
    const { sut } = makeSut()
    
    const payload = {
      params: { id: 1 }
     
    } 
    
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'validPlan',
      price: 99,
      duration: '3 meses'
    })
    expect(httpResponse.statusCode).toBe(200)
  })
})
