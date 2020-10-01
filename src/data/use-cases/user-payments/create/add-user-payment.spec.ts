
import { IAddUserPaymentRepository } from '@data/protocols/users-payments/add-user-payment'
import { Plan } from '@domain/models/plans/plans'
import { IUsersPaymentsModel } from '@domain/models/users-payments/users-payments'
import { IAddUserPaymentReceived } from '@domain/use-cases/users-payments/add-users-payments'
import { Users } from '@infra/db/mysql/typeorm/entities/users-entities'

import { AddUserPaymentsCase } from './add-user-payments'

interface SutTypes{
  addUserPaymentSut:IAddUserPaymentRepository
  sut:AddUserPaymentsCase
}
let UserRequest
let PlanRequest
const date = new Date()
const makeSut = ():SutTypes => {
  class AddUserPaymentRepositoryStub implements IAddUserPaymentRepository {
    async createRow (payload:IAddUserPaymentReceived):Promise<IUsersPaymentsModel> {
      return {
        id: 1,
        user: {} as Users,
        plan: {} as Plan,
        payment_value: 99,
        payment_type: 'boleto',
        payment_date: date
      }
    }
  }
  const addUserPaymentSut = new AddUserPaymentRepositoryStub()
  const sut = new AddUserPaymentsCase(addUserPaymentSut)
  return {
    addUserPaymentSut,
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

describe('=== ADD USER PLAN ===', () => {
  beforeEach(() => {
    UserRequest = {
      id: 1,
      name: 'validName',
      email: 'validMail',
      password: 'hashPass',
      isAdmin: false 
    }

    PlanRequest = {
      id: 1,
      name: 'validName',
      price: 10,
      duration: 'validDuration'
    }
  })
  
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPaymentSut, sut } = makeSut()
    const spyPlan = jest.spyOn(addUserPaymentSut, 'createRow')

    await sut.create(makeRequest())
    expect(spyPlan).toHaveBeenCalledWith(makeRequest())
  })
  it('Should expected to receveid correct parameters', async () => {
    const { addUserPaymentSut, sut } = makeSut()
    jest.spyOn(addUserPaymentSut, 'createRow').mockImplementation(() => { throw new Error() })

    expect(sut.create(makeRequest())).rejects.toThrow()
  })
  it('Should expected to return success', async () => {
    const { sut } = makeSut()
  
    const response = await sut.create(makeRequest())
    expect(response).toEqual({
      id: 1,
      user: {} as Users,
      plan: {} as Plan,
      payment_value: 99,
      payment_type: 'boleto',
      payment_date: date
    })
  })
})
