import { UsersPlans } from './users-plans'
import {
  serverError,
  FindPlanCase,
  badRequest,
  Validation,
  AddUserPlan,
  LoadAccountById
} from '../users-plans.protocols'
import { AddUserPlanStub, FindPlanCaseStub, FindUserStub, ValidatorStub } from '@presentation/tests'
import { makeUserPlanRequest } from '@presentation/tests/requests'
import { InvalidParamError, NotFoundError, ServerError } from '@presentation/errors'
interface SutTypes{
  sut:UsersPlans,
  validationSut:Validation,
  plansCaseSut:FindPlanCase,
  usersCaseSut:LoadAccountById,
  addUserPlanSut:AddUserPlan
}

const makeSut = ():SutTypes => {
  const addUserPlanSut = new AddUserPlanStub()
  const usersCaseSut = new FindUserStub()
  const plansCaseSut = new FindPlanCaseStub()
  const validationSut = new ValidatorStub()
  const sut = new UsersPlans(validationSut, plansCaseSut, usersCaseSut, addUserPlanSut)
  return { sut, validationSut, plansCaseSut, usersCaseSut, addUserPlanSut }
}

describe('=== USERS PLANS ===', () => {
  it('Should expected to return error userId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('userId'))

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('Should expected to return error planId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('planId'))

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
  it('Should expected to return error if plan id not exist', async () => {
    const { sut, plansCaseSut } = makeSut()

    jest.spyOn(plansCaseSut, 'find').mockReturnValue(null)

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id plan')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockImplementationOnce(() => { throw new Error() })

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })

  it('Should expected to return error if user id not exist', async () => {
    const { sut, addUserPlanSut } = makeSut()

    jest.spyOn(addUserPlanSut, 'create').mockImplementationOnce(() => { throw new Error() })

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })

  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })

  it('Should expected to return success on create', async () => {
    const { sut } = makeSut()

    const payload = makeUserPlanRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.user).toBeInstanceOf(Object)
    expect(httpResponse.body.plan).toBeInstanceOf(Object)
  })
})
