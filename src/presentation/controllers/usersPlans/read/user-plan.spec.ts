
import { NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ReadUserPlanStub } from '@presentation/tests'
import { ReadUsersPlans } from './users-plans'

interface ISutTypes {
  sut:ReadUsersPlans
  readUserPlan:ReadUserPlanStub
}

const makeReadPayload = () => ({
  params: { id: '1' }
})

const makeSut = ():ISutTypes => {
  const readUserPlan = new ReadUserPlanStub()
  const sut = new ReadUsersPlans(readUserPlan)
  return {
    sut,
    readUserPlan
  }
}

describe('=== READ USER PLAN ===', () => {
  it('Should expected to return error if user not exist', async () => {
    const { sut, readUserPlan } = makeSut()
    const payload = makeReadPayload()

    jest.spyOn(readUserPlan, 'find').mockReturnValue(null)
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('user plan')))
  })
  it('Should expected to return 500 if read throws', async () => {
    const { sut, readUserPlan } = makeSut()
    const payload = makeReadPayload()

    jest.spyOn(readUserPlan, 'find').mockImplementation(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })
  it('Should expected to return 200 if read return valid userPlan', async () => {
    const { sut } = makeSut()
    const payload = makeReadPayload()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.student).toBeTruthy()
    expect(httpResponse.body.plan).toBeTruthy()
  })
})
