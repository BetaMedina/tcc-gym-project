import { UsersPlans } from './users-plans'
import {
  serverError,
  Plan,
  FindPlanCase,
  UserAccount,
  badRequest,
  Validation,
  AddUserPlan,
  UserPlanModel,
  LoadAccountById,
  findPlanReceived
} from '../users-plans.protocols'

import { InvalidParamError, NotFoundError, ServerError } from '@presentation/errors'
import { IUpdateUserPlan } from '@domain/use-cases/users-plan/update-user-plan'
import { successResponse } from '@presentation/helpers/http/http-helper'
interface SutTypes{
  sut:UsersPlans,
  validationSut:Validation,
  plansCaseSut:FindPlanCase,
  usersCaseSut:LoadAccountById,
  updateUserPlanSut:IUpdateUserPlan
}

const makeRequest = () => {
  return {
    body: {
      id: 1,
      userId: 1,
      planId: 1
    }
  }
}

const makeSut = ():SutTypes => {
  class ValidatorStub implements Validation {
    validate (input:any):Error {
      return null
    }
  }
  class PlansCaseStub implements FindPlanCase {
    async find (payload:findPlanReceived):Promise<Plan> {
      return {
        id: 1,
        name: 'validPlan',
        price: 99,
        duration: '3 meses'
      }
    }
  }
  class UsersCaseStub implements LoadAccountById {
    async load (payload:Number):Promise<UserAccount> {
      return {
        id: 1,
        name: 'validName',
        email: 'validMail',
        password: 'validPass',
        isAdmin: false 
      }
    }
  }
  class UpdateUserPlanStub implements IUpdateUserPlan {
    async update (id:number, user:UserAccount, plan:Plan):Promise<UserPlanModel> {
      return {
        id: 1,
        user: {} as UserAccount,
        plan: {} as Plan 
      }
    }
  }
  const usersCaseSut = new UsersCaseStub()
  const plansCaseSut = new PlansCaseStub()
  const validationSut = new ValidatorStub()
  const updateUserPlanSut = new UpdateUserPlanStub()
  const sut = new UsersPlans(validationSut, plansCaseSut, usersCaseSut, updateUserPlanSut)
  return { sut, validationSut, plansCaseSut, usersCaseSut, updateUserPlanSut }
}

describe('=== USERS PLANS UPDATE ===', () => {
  it('Should expected to return error userId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('userId'))

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('Should expected to return error planId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('planId'))

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
  it('Should expected to return error if plan id not exist', async () => {
    const { sut, plansCaseSut } = makeSut()

    jest.spyOn(plansCaseSut, 'find').mockReturnValue(null)

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id plan')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockImplementationOnce(() => Promise.reject(new Error()))

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })
  it('Should expected to return error if updateUser throws', async () => {
    const { sut, updateUserPlanSut } = makeSut()

    jest.spyOn(updateUserPlanSut, 'update').mockImplementationOnce(() => { throw new Error() })

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()

    const payload = makeRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(successResponse({ id: 1, user: {}, plan: {} }))
  })
})
