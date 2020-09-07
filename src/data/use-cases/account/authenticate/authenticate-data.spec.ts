import { Compare } from '@data/protocols/encrypter/encrypt'
import { JwtAdapter } from '@data/protocols/encrypter/hash-jwt'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { UserAccount } from '@domain/models/use-account'
import { AuthenticationData } from './authenticate-data'

interface SutTypes{
  sut:AuthenticationData
  accountSut:LoadAccountByEmailRepository
  encryptSut:Compare
  jwtSut: JwtAdapter
}

const makeSut = ():SutTypes => {
  class AccountStub implements LoadAccountByEmailRepository {
    loadByEmail (email:string):Promise<UserAccount> {
      return new Promise(resolve => resolve({
        id: 1,
        name: 'validName',
        email: 'validMail',
        password: 'validPassword'
      })) 
    } 
  }
  class JwtAdapterStub implements JwtAdapter {
    async hashGenerate (id:number):Promise<string> {
      return 'hashedPassword'
    } 
  }

  class EncryptStub implements Compare {
    compare (email:string):Promise<boolean> {
      return new Promise(resolve => resolve(true)) 
    } 
  }
  const accountSut = new AccountStub()
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
    const payload = {
      password: 'anyValue',
      email: 'anyMail@gmail.com'
    }
    expect(sut.auth(payload)).rejects.toThrow()
  })
  it('Should be expected return unauthorized if wrong mail is provider', async () => {
    const { accountSut, sut } = makeSut()

    jest.spyOn(accountSut, 'loadByEmail').mockReturnValueOnce(null)

    const payload = {
      password: 'anyValue',
      email: 'anyMail@gmail.com'
    }
    const response = await sut.auth(payload)
    expect(response).toEqual(null)
  })
  it('Verify paremeters pass to compare password', async () => {
    const { encryptSut, sut } = makeSut()

    const passwordSpy = jest.spyOn(encryptSut, 'compare')

    const payload = {
      password: 'anyValue',
      email: 'anyMail@gmail.com'
    }
    await sut.auth(payload)
    expect(passwordSpy).toBeCalledWith('anyValue', 'validPassword')
  })
  it('return error if wrong password is provider', async () => {
    const { encryptSut, sut } = makeSut()

    jest.spyOn(encryptSut, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const payload = {
      password: 'invalidPassword',
      email: 'anyMail@gmail.com'
    }
    const response = await sut.auth(payload)
    expect(response).toBe(null)
  })
  it('expected throw if jwt throws', async () => {
    const { jwtSut, sut } = makeSut()

    jest.spyOn(jwtSut, 'hashGenerate').mockImplementationOnce(() => { throw new Error('any_error') })

    const payload = {
      password: 'validPassword',
      email: 'anyMail@gmail.com'
    }
    expect(sut.auth(payload)).rejects.toThrow()
  })
  it('return error if wrong password is provider', async () => {
    const { sut } = makeSut()

    const payload = {
      password: 'validPassword',
      email: 'anyMail@gmail.com'
    }
    const response = await sut.auth(payload)
    expect(response).toEqual({
      accessToken: 'hashedPassword',
      name: 'validName'
    })
  })
})
