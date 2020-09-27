import { ReadUserPlanRepositoryStub } from '@data/tests/mock-users-plan'
import { ReadUserPlanCase } from './read-user-plan'

interface ISutTypes {
  findUserPlanSut:ReadUserPlanRepositoryStub
  sut:ReadUserPlanCase
}

const makeSut = ():ISutTypes => {
  const findUserPlanSut = new ReadUserPlanRepositoryStub()
  const sut = new ReadUserPlanCase(findUserPlanSut)
  return {
    findUserPlanSut,
    sut
  }
}
const makeParamsRequest = () => ('1')

describe('=== Read User Plan UseCase===', () => {
  it('Should expected to throw if find throws', async () => {
    const { findUserPlanSut, sut } = makeSut()
    jest.spyOn(findUserPlanSut, 'readRow').mockRejectedValueOnce(() => { throw new Error('any_error') })

    expect(sut.find(makeParamsRequest())).rejects.toThrow('any_error')
  })
  
  it('Should expected to called repository with correct params', async () => {
    const { findUserPlanSut, sut } = makeSut()
    const params = jest.spyOn(findUserPlanSut, 'readRow')
    await sut.find(makeParamsRequest())
    expect(params).toBeCalledWith('1')
  })

  it('Should expected to find userPlan', async () => {
    const { sut } = makeSut()
    const response = await sut.find(makeParamsRequest())

    expect(response.user).toBeTruthy()
    expect(response.plan).toBeTruthy()
  })
})
