import { ListUserPlan } from './list-user-plan'
import { IListUserPlanRepository } from '@data/protocols/user-plan/list-user-plan'
import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'

interface SutTypes { 
  listUserPlansSut:IListUserPlanRepository
  sut:ListUserPlan
}
class ListUserPlanRepository implements IListUserPlanRepository {
  async listRows ():Promise<IListUserPlanModel[]> {
    return [{
      id: 1,
      student: {
        id: 1,
        name: 'validName',
        email: 'validMail@mail.com',
        age: 22,
        weigth: 99,
        height: 20
      },
      plan: {
        id: 1,
        name: 'validName',
        price: 55,
        duration: 15
      }
    }]
  }
}

const makeSut = ():SutTypes => {
  const listUserPlansSut = new ListUserPlanRepository()
  const sut = new ListUserPlan(listUserPlansSut)

  return { 
    listUserPlansSut,
    sut
  } 
}

describe('=== List Plans Use Case ===', () => {
  it('Should expected return success', async () => {
    const { sut } = makeSut()

    const response = await sut.list()
    expect(response[0].id).toBeTruthy()
    expect(response[0].student).toBeTruthy()
    expect(response[0].plan).toBeTruthy()
    expect(response).toBeInstanceOf(Array)
  })
})
