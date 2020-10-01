import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IListUsersPayments } from '@domain/use-cases/users-payments/list-users-payments'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { ServerError } from '@presentation/errors'
import { serverError } from '@presentation/helpers/http/http-helper'
import { ListUsersPayments } from './users-payments'

interface ISutTypes{
  listUserPaymentsSut:IListUsersPayments,
  sut:ListUsersPayments
}
const date = new Date()

class ListUsersPaymentsStub implements IListUsersPayments {
  async list ():Promise<IUsersPaymentsModel[]> {
    return [{
      id: 1,
      user: {} as Users,
      plan: {} as Plans,
      payment_value: 99,
      payment_type: 'boleto',
      payment_date: date
    }]
  }
}
const makeSut = ():ISutTypes => {
  const listUserPaymentsSut = new ListUsersPaymentsStub()
  const sut = new ListUsersPayments(listUserPaymentsSut)
  return {
    listUserPaymentsSut,
    sut
  }
}
describe('=== List Users Plans ===', () => {
  it('Should expected to return error if list users return empty', async () => {
    const { listUserPaymentsSut, sut } = makeSut()
    jest.spyOn(listUserPaymentsSut, 'list').mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(204)
  })
  it('Should expected to return error if listUsers throws', async () => {
    const { listUserPaymentsSut, sut } = makeSut()
    jest.spyOn(listUserPaymentsSut, 'list').mockImplementationOnce(() => { throw new Error('validError') })

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError('validError')))
  })
  
  it('Should expected to return success', async () => {
    const { sut, listUserPaymentsSut } = makeSut()
    
    const compareResponse = await listUserPaymentsSut.list()

    const httpResponse = await sut.handle()
    
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(compareResponse)
    expect(httpResponse.body[0].id).toBe(1)
  })
})
