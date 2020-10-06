import { Compare } from '@data/protocols/encrypter/encrypt'
import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { AuthenticationData } from './authenticate-data'
import { LoadAccountByEmailStub, JwtAdapterStub, EncryptStub } from '@data/tests'
import { mockAuthenticationParams, mockAccountModel } from '@domain/tests/mock-user-model'

interface SutTypes{
  sut:AuthenticationData
  accountSut:LoadAccountByEmailRepository
  encryptSut:Compare
  jwtSut: JwtAdapter
}

const makeSut = ():SutTypes => {
  const accountSut = new LoadAccountByEmailStub()
  const encryptSut = new EncryptStub()
  const jwtSut = new JwtAdapterStub()
  const sut = new AuthenticationData(encryptSut, accountSut, jwtSut)
  return {
    sut, 
    encryptSut,
    accountSut,
    jwtSut
  }
}

describe('=== Authenticate Data ===', () => {
  it('Should be expected to throw if find user throw', async () => {
    const { accountSut, sut } = makeSut()

    jest.spyOn(accountSut, 'loadByEmail').mockImplementationOnce(() => { throw new Error('any_error') })
    const payload = mockAuthenticationParams()
    expect(sut.auth(payload)).rejects.toThrow()
  })
  it('Should be expected return unauthorized if wrong mail is provider', async () => {
    const { accountSut, sut } = makeSut()

    jest.spyOn(accountSut, 'loadByEmail').mockReturnValueOnce(null)

    const payload = mockAuthenticationParams()
    const response = await sut.auth(payload)
    expect(response).toEqual(null)
  })
  it('Verify paremeters pass to compare password', async () => {
    const { encryptSut, sut } = makeSut()

    const passwordSpy = jest.spyOn(encryptSut, 'compare')

    const payload = mockAuthenticationParams()
    await sut.auth(payload)
    expect(passwordSpy).toBeCalledWith(payload.password, mockAccountModel().password)
  })
  it('return error if wrong password is provider', async () => {
    const { encryptSut, sut } = makeSut()

    jest.spyOn(encryptSut, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const payload = mockAuthenticationParams()
    const response = await sut.auth(payload)
    expect(response).toBe(null)
  })
  it('expected throw if jwt throws', async () => {
    const { jwtSut, sut } = makeSut()

    jest.spyOn(jwtSut, 'hashGenerate').mockImplementationOnce(() => { throw new Error('any_error') })

    const payload = mockAuthenticationParams()
    expect(sut.auth(payload)).rejects.toThrow()
  })
  it('return error if wrong password is provider', async () => {
    const { sut } = makeSut()

    const payload = mockAuthenticationParams()
    const response = await sut.auth(payload)
    expect(response).toEqual({
      accessToken: 'hashedPassword',
      name: 'valid_name',
      isAdmin:false
    })
  })
})
