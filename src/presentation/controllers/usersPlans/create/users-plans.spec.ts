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
    async create (user:UserAccount, plan:Plan):Promise<UserPlanModel> {
      return {
        id: 1,
        user: {} as UserAccount,
        plan: {} as Plan
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
    expect(httpResponse.body.user).toBeInstanceOf(Object)
    expect(httpResponse.body.plan).toBeInstanceOf(Object)
  })
})
