import { ReadPlanRepository } from '@data/protocols/plan/read-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { FindUserCase, findUserReceived } from '@domain/use-cases/account/find-account-db'
import { FindPlanCase, findPlanReceived } from '@domain/use-cases/plans/find-plan-db'
import { UserAccount } from '@domain/models/account/use-account'
import { InvalidParamError, NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { Validation } from '@presentation/protocols/validation'
import { UsersPlans } from './users-plans'
import { AddUserPlan, UserPlanReceveid } from '@domain/use-cases/users-plan/add-user-plan'
import { UserPlanModel } from '@domain/models/user-plans/users-plans'
import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'

interface SutTypes{
  sut:UsersPlans,
  validationSut:Validation,
  plansCaseSut:FindPlanCase,
  usersCaseSut:LoadAccountById,
  addUserPlanSut:AddUserPlan
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
  class AddUserPlanStub implements AddUserPlan {
    async create (payload:UserPlanReceveid):Promise<UserPlanModel> {
      return {
        id: 1,
        userId: 1,
        planId: 1
      }
    }
  }
  const addUserPlanSut = new AddUserPlanStub()
  const usersCaseSut = new UsersCaseStub()
  const plansCaseSut = new PlansCaseStub()
  const validationSut = new ValidatorStub()
  const sut = new UsersPlans(validationSut, plansCaseSut, usersCaseSut, addUserPlanSut)
  return { sut, validationSut, plansCaseSut, usersCaseSut, addUserPlanSut }
}

describe('=== USERS PLANS ===', () => {
  it('Should expected to return error userId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('userId'))

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('Should expected to return error planId not pass', async () => {
    const { sut, validationSut } = makeSut()
    jest.spyOn(validationSut, 'validate').mockReturnValue(new InvalidParamError('planId'))

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
  it('Should expected to return error if plan id not exist', async () => {
    const { sut, plansCaseSut } = makeSut()

    jest.spyOn(plansCaseSut, 'find').mockReturnValue(null)

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id plan')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })
  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockImplementationOnce(() => { throw new Error() })

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })

  it('Should expected to return error if user id not exist', async () => {
    const { sut, addUserPlanSut } = makeSut()

    jest.spyOn(addUserPlanSut, 'create').mockImplementationOnce(() => { throw new Error() })

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('Internal server error')))
  })

  it('Should expected to return error if user id not exist', async () => {
    const { sut, usersCaseSut } = makeSut()

    jest.spyOn(usersCaseSut, 'load').mockReturnValue(null)

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })

  it('Should expected to return success on create', async () => {
    const { sut } = makeSut()

    const payload = {
      body: {
        userId: 1,
        planId: 1
      }
    }

    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toEqual(200)
    expect(httpResponse.body.userId).toEqual(payload.body.userId)
    expect(httpResponse.body.planId).toEqual(payload.body.userId)
  })
})
