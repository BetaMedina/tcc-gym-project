
import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IReadUsersPayment } from '@domain/use-cases/users-payments/read-users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { NotFoundError, ServerError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/http/http-helper'
import { ReadUsersPayments } from './users-payments'

interface ISutTypes {
  sut:ReadUsersPayments
  readUserPaymentSut:IReadUsersPayment
}

const makeReadPayload = () => ({
  params: { id: '1' }
})

export class ReadUserPaymentStub implements IReadUsersPayment {
  async find (id:string):Promise<IUsersPaymentsModel> {
    return {
      id: 1,
      user: {} as Users,
      plan: {} as Plan,
      payment_value: 99,
      payment_type: 'boleto',
      payment_date: new Date()
    } 
  }
}

const makeSut = ():ISutTypes => {
  const readUserPaymentSut = new ReadUserPaymentStub()
  const sut = new ReadUsersPayments(readUserPaymentSut)
  return {
    sut,
    readUserPaymentSut
  }
}

describe('=== READ USER PLAN ===', () => {
  it('Should expected to return error if user not exist', async () => {
    const { sut, readUserPaymentSut } = makeSut()
    const payload = makeReadPayload()

    jest.spyOn(readUserPaymentSut, 'find').mockReturnValue(null)
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new NotFoundError('user payment')))
  })
  it('Should expected to return 500 if read throws', async () => {
    const { sut, readUserPaymentSut } = makeSut()
    const payload = makeReadPayload()

    jest.spyOn(readUserPaymentSut, 'find').mockImplementation(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle(payload)
    
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })
  it('Should expected to return 200 if read return valid userPlan', async () => {
    const { sut } = makeSut()
    const payload = makeReadPayload()

    const httpResponse = await sut.handle(payload)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.user).toBeTruthy()
    expect(httpResponse.body.plan).toBeTruthy()
  })
})
