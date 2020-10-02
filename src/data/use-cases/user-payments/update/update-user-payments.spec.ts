
import { UpdateUserPaymentCase } from './update-user-payment'
import { IUpdateUserPaymentRepository } from '@data/protocols/users-payments/update-user-payment'
import { IUpdateUserPaymentReceived } from '@domain/use-cases/users-payments/update-users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'
import { Plan } from '@domain/models/plans/plans'

interface SutTypes{
  updateUserPlanSut:IUpdateUserPaymentRepository
  sut:UpdateUserPaymentCase
}
let UserRequest
let PlanRequest
const date = new Date()

const makeSut = ():SutTypes => {
  class UpdateUserPlanRepositoryStub implements IUpdateUserPaymentRepository {
    async updateRow (payload: IUpdateUserPaymentReceived):Promise<boolean> {
      return true
    }
  }
  const updateUserPlanSut = new UpdateUserPlanRepositoryStub()
  const sut = new UpdateUserPaymentCase(updateUserPlanSut)
  return {
    updateUserPlanSut,
    sut
  }
}

const makeRequest = () => ({
  id: 1,
  user: {} as Users,
  plan: {} as Plan,
  paymentValue: 99,
  paymentType: 'boleto',
  paymentDate: date
})

describe('=== UPDATE USER PLAN ===', () => {
  it('Should expected to receveid correct parameters', async () => {
    const { updateUserPlanSut, sut } = makeSut()
    const spyPlan = jest.spyOn(updateUserPlanSut, 'updateRow')

    await sut.update(makeRequest())
    expect(spyPlan).toHaveBeenCalledWith(makeRequest())
  })
  it('Should expected to receveid correct parameters', async () => {
    const { updateUserPlanSut, sut } = makeSut()
    jest.spyOn(updateUserPlanSut, 'updateRow').mockImplementation(() => { throw new Error() })
  
    expect(sut.update(makeRequest())).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
  
    const response = await sut.update(makeRequest())
    expect(response).toEqual(true)
  })
})
