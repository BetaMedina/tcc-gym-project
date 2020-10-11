import { ListUserPayments } from './list-user-payment'
import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { IListUserPaymentRepository } from '@data/protocols/users-payments/list-user-payments'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { Plans } from '@infra/db/mysql/typeorm/entities/plans-entities'
import { Students } from '@infra/db/mysql/typeorm/entities/students-entities'

interface SutTypes { 
  repositorySut:IListUserPlanRepository
  sut:ListUserPayments
}
class ListUserPlanRepository implements IListUserPaymentRepository {
  async listRows ():Promise<IUsersPaymentsModel[]> {
    return [{
      id: 1,
      student: {} as Students,
      plan: {} as Plans,
      payment_type: 'boleto',
      payment_date: new Date(),
      payment_value: 99
    }]
  }
}

const makeSut = ():SutTypes => {
  const repositorySut = new ListUserPlanRepository()
  const sut = new ListUserPayments(repositorySut)

  return { 
    repositorySut,
    sut
  } 
}

describe('=== Users Payments Use Case ===', () => {
  it('Should expected return success', async () => {
    const { sut } = makeSut()

    const response = await sut.list()
    expect(response[0].id).toBeTruthy()
    expect(response[0].student).toBeTruthy()
    expect(response[0].plan).toBeTruthy()
    expect(response).toBeInstanceOf(Array)
  })
})
