import { IReadUserPaymentRepository } from '@data/protocols/users-payments/read-user-payment'
import { ReadUserPlanRepositoryStub } from '@data/tests/mock-users-plan'
import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { ReadUserPayment } from './read-user-payment'

interface ISutTypes {
  findUserPaymentSut:IReadUserPaymentRepository
  sut:ReadUserPayment
}

export class ReadUserPaymentStub implements IReadUserPaymentRepository {
  async readRow (id:string):Promise<IUsersPaymentsModel> {
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
  const findUserPaymentSut = new ReadUserPaymentStub()
  const sut = new ReadUserPayment(findUserPaymentSut)
  return {
    findUserPaymentSut,
    sut
  }
}
const makeParamsRequest = () => ('1')

describe('=== Read User Payment UseCase===', () => {
  it('Should expected to throw if find throws', async () => {
    const { findUserPaymentSut, sut } = makeSut()
    jest.spyOn(findUserPaymentSut, 'readRow').mockRejectedValueOnce(() => { throw new Error('any_error') })

    expect(sut.find(makeParamsRequest())).rejects.toThrow('any_error')
  })
  
  it('Should expected to called repository with correct params', async () => {
    const { findUserPaymentSut, sut } = makeSut()
    const params = jest.spyOn(findUserPaymentSut, 'readRow')
    await sut.find(makeParamsRequest())
    expect(params).toBeCalledWith('1')
  })

  it('Should expected to find userPlan', async () => {
    const { sut } = makeSut()
    const response = await sut.find(makeParamsRequest())

    expect(response.user).toBeTruthy()
    expect(response.plan).toBeTruthy()
  })
})
