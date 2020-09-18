import { PlansController } from './plans-controller'
import { AddPlanCase } from '@domain/use-cases/plans/add-plan-db'
import { AddPlanStub, ValidatorStub } from '@presentation/tests'
import { serverError, successResponse, badRequest, InvalidParamError, Validation } from '../plans-protocols'
import { mockPlanPostRequest } from '@presentation/tests/requests/plans/mock-plan-request'
import { mockPlanModel } from '@domain/tests/mock-plan-model'

interface SutTypes{
  validatorSut:Validation
  sut:PlansController,
  addPlanSut:AddPlanCase
}

const makeSut = ():SutTypes => {
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
    const payload = mockPlanPostRequest()

    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('name'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')))
  })
  it('Should expected to return error if wrong parameters have been passed', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockPlanPostRequest()
    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('price'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('price')))
  })
  it('Should expected to return error if wrong parameters have been passed', async () => {
    const { sut, validatorSut } = makeSut()
    const payload = mockPlanPostRequest()
    jest.spyOn(validatorSut, 'validate').mockReturnValue(new InvalidParamError('duration'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('duration')))
  })
  it('Should expected to throw if create throw', async () => {
    const { sut, addPlanSut } = makeSut()
    const payload = mockPlanPostRequest()
    jest.spyOn(addPlanSut, 'create').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should to return success', async () => {
    const { sut } = makeSut()
    const payload = mockPlanPostRequest()
    const httpResponse = await sut.handle(payload)
    expect(httpResponse.body).toEqual({ id: 1, ...payload.body })
    expect(httpResponse.statusCode).toBe(200)
  })
})
