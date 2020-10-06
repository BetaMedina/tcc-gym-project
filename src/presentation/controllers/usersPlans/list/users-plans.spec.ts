import { IListUserPlanModel } from '@domain/models/user-plans/list-users-plan'
import { IListUsersPlans, serverError, ServerError } from '../users-plans.protocols'
import { ListUsersPlansController } from './users-plans'

interface ISutTypes{
  listUserSut:IListUsersPlans,
  sut:ListUsersPlansController
}

class ListUsersPlans implements IListUsersPlans {
  async list ():Promise<IListUserPlanModel[]> {
    return [{
      id: 1,
      user: {
        id: 1,
        name: 'validName',
        email: 'validMail@mail.com',
        password: 'hasPass',
        isAdmin: false
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
const makeSut = ():ISutTypes => {
  const listUserSut = new ListUsersPlans()
  const sut = new ListUsersPlansController(listUserSut)
  return {
    listUserSut,
    sut
  }
}
describe('=== List Users Plans ===', () => {
  it('Should expected to return error if list users return empty', async () => {
    const { listUserSut, sut } = makeSut()
    jest.spyOn(listUserSut, 'list').mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(204)
  })
  it('Should expected to return error if listUsers throws', async () => {
    const { listUserSut, sut } = makeSut()
    jest.spyOn(listUserSut, 'list').mockImplementationOnce(() => { throw new Error('validError') })

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError('validError')))
  })
  it('Should expected to return error if listUsers throws', async () => {
    const { listUserSut, sut } = makeSut()
    jest.spyOn(listUserSut, 'list').mockImplementationOnce(() => { throw new Error('validError') })

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse).toEqual(serverError(new ServerError('validError')))
  })
  it('Should expected to return success', async () => {
    const { sut, listUserSut } = makeSut()
    
    const compareResponse = await listUserSut.list()

    const httpResponse = await sut.handle()
    
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(compareResponse)
    expect(httpResponse.body[0].id).toBe(1)
  })
})
