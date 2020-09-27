import { UsersPlans } from './users-plans'
import {
  serverError,
  FindPlanCase,
  badRequest,
  Validation,
  LoadAccountById
} from '../users-plans.protocols'

import { InvalidParamError, NotFoundError, ServerError } from '@presentation/errors'
import { IUpdateUserPlan } from '@domain/use-cases/users-plan/update-user-plan'
import { successResponse } from '@presentation/helpers/http/http-helper'
import { FindPlanCaseStub, FindUserStub, ValidatorStub, UpdateUserPlanStub } from '@presentation/tests'
import { makeUserPlanUpdateRequest } from '@presentation/tests/requests'

interface SutTypes{
  sut:UsersPlans,
  validationSut:Validation,
  plansCaseSut:FindPlanCase,
  usersCaseSut:LoadAccountById,
  updateUserPlanSut:IUpdateUserPlan
}

const makeSut = ():SutTypes => {
  const usersCaseSut = new FindUserStub()
  const plansCaseSut = new FindPlanCaseStub()
  const validationSut = new ValidatorStub()
  const updateUserPlanSut = new UpdateUserPlanStub()
  const sut = new UsersPlans(validationSut, plansCaseSut, usersCaseSut, updateUserPlanSut)
  return { sut, validationSut, plansCaseSut, usersCaseSut, updateUserPlanSut }
}

describe('=== USERS PLANS UPDATE ===', () => {
  it('Should expected to return error userId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('userId'))

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('Should expected to return error planId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('planId'))

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
  it('Should expected to return error if plan id not exist', async () => {
    const { sut, plansCaseSut } = makeSut()

    jest.spyOn(plansCaseSut, 'find').mockReturnValue(null)

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id plan')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockImplementationOnce(() => Promise.reject(new Error()))

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })
  it('Should expected to return error if updateUser throws', async () => {
    const { sut, updateUserPlanSut } = makeSut()

    jest.spyOn(updateUserPlanSut, 'update').mockImplementationOnce(() => { throw new Error() })

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()

    const payload = makeUserPlanUpdateRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(successResponse({ id: 1, user: {}, plan: {} }))
  })
})
