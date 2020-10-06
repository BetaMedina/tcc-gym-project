import { UserAccount } from '@domain/models/account/use-account'
import { IListUser } from '@domain/use-cases/account/list-account'
import { emptyResponse, serverError } from '@presentation/helpers/http/http-helper'
import { ListAccountController } from './account-controller'

interface ISutTypes{
  getAllSut:IListUser
  sut:ListAccountController
}

class ListGetAllStub implements IListUser {
  async getAll ():Promise<UserAccount[]> {
    return [{
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'validPass',
      isAdmin: false 
    }]
  }
}

const makeSut = ():ISutTypes => {
  const getAllSut = new ListGetAllStub()
  const sut = new ListAccountController(getAllSut)
  return {
    getAllSut,
    sut
  }
}

describe('ListAccountController', () => {
  it('Should expected to return 500 if GetAll throws', async () => {
    const { getAllSut, sut } = makeSut()
    
    jest.spyOn(getAllSut, 'getAll').mockImplementationOnce(() => { throw new Error('Internal Server Error') })
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(serverError(new Error('Internal Server Error')))
  })
  it('Should expected to return 204 ', async () => {
    const { getAllSut, sut } = makeSut()
    jest.spyOn(getAllSut, 'getAll').mockReturnValue(Promise.resolve([]))
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(emptyResponse())
  })
  it('Should expected to return 200 ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toEqual(200)
  })
})
