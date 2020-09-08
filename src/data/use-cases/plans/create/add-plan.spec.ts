import { AddPlanRepository, AddPlanReceived } from '@data/protocols/plan/add-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { AddPlan } from './add-plan'

interface SutTypes{
  addPlanSut:AddPlanRepository
  sut:AddPlan
}

const makeSut = ():SutTypes => {
  class AddPlanRepositoryStub implements AddPlanRepository {
    createRow (account:AddPlanReceived):Promise<Plan> {
      return new Promise(resolve => resolve({
        id: 1,
        name: 'validName',
        price: 99.99,
        duration: '15 dias'
      }))
    }
  }
  const addPlanSut = new AddPlanRepositoryStub()
  const sut = new AddPlan(addPlanSut)
  return {
    addPlanSut,
    sut
  }
}

describe('=== ADD PLAN ===', () => {
  it('Should expected to receveid correct parameters', async () => {
    const { addPlanSut, sut } = makeSut()
    const spyPlan = jest.spyOn(addPlanSut, 'createRow')
    const payload = {
      name: 'validName',
      price: 99.99,
      duration: '15 dias'
    }
    await sut.create(payload)
    expect(spyPlan).toHaveBeenCalledWith({
      name: 'validName',
      price: 99.99,
      duration: '15 dias'
    })
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
    const payload = {
      name: 'validName',
      price: 99.99,
      duration: '15 dias'
    }
    const response = await sut.create(payload)
    expect(response).toEqual({
      id: 1,
      name: 'validName',
      price: 99.99,
      duration: '15 dias'
    })
  })
})
