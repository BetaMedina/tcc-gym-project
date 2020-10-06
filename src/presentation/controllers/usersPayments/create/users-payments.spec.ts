import { UserAccount } from '@domain/models/account/use-account'
import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { FindUserCase, findUserReceived } from '@domain/use-cases/account/find-account-db'
import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'
import { FindPlanCase, findPlanReceived } from '@domain/use-cases/plans/find-plan-db'
import { IAddUserPaymentReceived, IUserPayment } from '@domain/use-cases/users-payments/add-users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { InvalidParamError, NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError, successResponse } from '@presentation/helpers/http/http-helper'
import { ValidatorStub } from '@presentation/tests'
import { UsersPayments } from './users-payments'

const date = new Date()
interface ISutTypes{
  sut:UsersPayments,
  validateSut:ValidatorStub,
  findUserSut:LoadAccountById,
  findPlanSut:FindPlanCase
}

class FindUserStub implements LoadAccountById {
  async load (id:Number):Promise<UserAccount> {
    return {
      id: 1,
      name: 'validName',
      email: 'validMail@mail.com',
      password: 'hashPass',
      isAdmin: false
    }
  }
}

class FindPlanStub implements FindPlanCase {
  async find (payload:findPlanReceived):Promise<Plan> {
    return {
      id: 1,
      name: 'validName',
      price: 99,
      duration: 15
    }
  }
}
class CreateUserPaymentStub implements IUserPayment {
  async create (payload:IAddUserPaymentReceived): Promise<IUsersPaymentsModel> {
    return {
      id: 1,
      user: {} as Users,
      plan: {} as Plan,
      payment_value: 99,
      payment_type: 'boleto',
      payment_date: date
    }
  }
}

const makeSut = ():ISutTypes => {
  const validateSut = new ValidatorStub()
  const findUserSut = new FindUserStub()
  const findPlanSut = new FindPlanStub()
  const createUserPayment = new CreateUserPaymentStub()
  const sut = new UsersPayments(validateSut, findUserSut, findPlanSut, createUserPayment)
  return {
    sut, validateSut, findUserSut, findPlanSut
  }
}

const makeUsersPaymentsRequest = () => ({
  body: {
    user_id: 1, 
    plan_id: 1, 
    paymentValue: 69, 
    paymentType: 'boleto',
    paymentDate: date
  }
})

describe('=== Users Payments ===', () => {
  it('should expect to return error if user_id not have been pass', async () => {
    const { sut, validateSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(validateSut, 'validate').mockReturnValue(new InvalidParamError('userId'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('userId')))
  })
  it('should expect to return error if plan_id not have been pass', async () => {
    const { sut, validateSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(validateSut, 'validate').mockReturnValue(new InvalidParamError('planId'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('planId')))
  })
  it('should expect to return error if payment value not have been pass', async () => {
    const { sut, validateSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(validateSut, 'validate').mockReturnValue(new InvalidParamError('paymentValue'))
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('paymentValue')))
  })
  it('should expect to return error if user not exist', async () => {
    const { sut, findUserSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(findUserSut, 'load').mockReturnValue(null)
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id user')))
  })
  it('should expect to return error if plan not exist', async () => {
    const { sut, findPlanSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(findPlanSut, 'find').mockReturnValue(null)
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('Id plan')))
  })
  it('should expect to return error if plan not exist', async () => {
    const { sut, findPlanSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(findPlanSut, 'find').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })
  it('should expect to return error if plan not exist', async () => {
    const { sut, findUserSut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    jest.spyOn(findUserSut, 'load').mockImplementationOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })
  it('Should expected to return succes', async () => {
    const { sut } = makeSut()
    const payload = makeUsersPaymentsRequest()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse).toEqual(successResponse({
      id: 1,
      user: {},
      plan: {},
      payment_value: 99,
      payment_type: 'boleto',
      payment_date: date
    }))
  })
})
