import { UpdatePlan } from './update-plan'
import { Plan } from '@domain/models/plans/plans'
import { UpdatePlanRepository } from '@data/protocols/plan/update-plan-db'

interface SutTypes { 
  updatePlanSut:UpdatePlanRepository
  sut:UpdatePlan
}

const makeSut = ():SutTypes => {
  class UpdatePlanSut implements UpdatePlanRepository {
    async updateRows ():Promise<Plan> {
      return {
        id: 1,
        name: 'any_name',
        price: 99,
        duration: '3 m'
      }
    }
  }
  const updatePlanSut = new UpdatePlanSut()
  const sut = new UpdatePlan(updatePlanSut)

  return { 
    updatePlanSut,
    sut
  } 
}

describe('=== Update Plans Use Case ===', () => {
  it('Should expected to throw a new error if Update throw', async () => {
    const { updatePlanSut, sut } = makeSut()
    const payload = {
      id: 1,
      name: 'any_name',
      price: 99,
      duration: '3 m'
    }
    jest.spyOn(updatePlanSut, 'updateRows').mockImplementationOnce(() => { throw new Error('any_error') })
    expect(sut.update(payload)).rejects.toThrow()
  })
  it('Should expected return one updated Plans ', async () => {
    const { sut } = makeSut()
    const payload = {
      id: 1,
      name: 'old_name',
      price: 99,
      duration: '3 m'
    }
    const httpResponse = await sut.update(payload)
    expect(httpResponse).toEqual({
      id: 1,
      name: 'any_name',
      price: 99,
      duration: '3 m'
    })
  })
})
