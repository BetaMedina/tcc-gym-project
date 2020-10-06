import { ListPlansCase } from './list-plan'
import { Plan } from '@domain/models/plans/plans'
import { ListPlansRepository } from '@data/protocols/plan/list-plan-db'

interface SutTypes { 
  listPlansSut:ListPlansRepository
  sut:ListPlansCase
}

const makeSut = ():SutTypes => {
  class ListPlansRepositoryStub implements ListPlansRepository {
    async listRows ():Promise<Plan[]> {
      return [{
        id: 1,
        name: 'any_name',
        price: 99,
        duration: 3
      }]
    }
  }
  const listPlansSut = new ListPlansRepositoryStub()
  const sut = new ListPlansCase(listPlansSut)

  return { 
    listPlansSut,
    sut
  } 
}

describe('=== List Plans Use Case ===', () => {
  it('Should expected to throw a new error if List All Plans throw', async () => {
    const { listPlansSut, sut } = makeSut()

    jest.spyOn(listPlansSut, 'listRows').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.list()).rejects.toThrow()
  })
  it('Should expected return one Plans array', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.list()
    expect(httpResponse).toEqual([{
      id: 1,
      name: 'any_name',
      price: 99,
      duration: 3
    }])
  })
})
