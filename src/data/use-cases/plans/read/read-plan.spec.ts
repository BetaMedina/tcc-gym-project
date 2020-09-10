import { FindPlan } from './read-plan'
import { Plan } from '@domain/models/plans/plans'
import { ReadPlanRepository } from '@data/protocols/plan/read-plan-db'

interface SutTypes { 
  readPlanSut:ReadPlanRepository
  sut:FindPlan
}

const makeSut = ():SutTypes => {
  class FindPlanRepository implements ReadPlanRepository {
    async readRows ():Promise<Plan> {
      return {
        id: 1,
        name: 'any_name',
        price: 99,
        duration: '3 m'
      }
    }
  }
  const readPlanSut = new FindPlanRepository()
  const sut = new FindPlan(readPlanSut)

  return { 
    readPlanSut,
    sut
  } 
}

describe('=== List Plan Use Case ===', () => {
  it('Should expected to throw a new error if Read throw', async () => {
    const { readPlanSut, sut } = makeSut()
    const payload = {
      id: 1
    }
    jest.spyOn(readPlanSut, 'readRows').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.find(payload)).rejects.toThrow()
  })
  it('Should expected return one updated Plans ', async () => {
    const { sut } = makeSut()
    const payload = {
      id: 1
    }
    const httpResponse = await sut.find(payload)
    expect(httpResponse).toEqual({
      id: 1,
      name: 'any_name',
      price: 99,
      duration: '3 m'
    })
  })
})
