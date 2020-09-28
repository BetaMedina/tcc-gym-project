import { JsonWebTokenAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'
import { ENUM } from '../cryptography-enum/enum-crypt'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'tokenGenerate'
  },
  async verify (): Promise<string> {
    return 'decrypt'
  }
}))

const makeSut = (): JsonWebTokenAdapter => {
  return new JsonWebTokenAdapter()
}

describe('JWT Adapter', () => {
  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(jwt, 'sign')
      await sut.hashGenerate(1)
      expect(hashSpy).toHaveBeenCalledWith({ id: 1 }, ENUM.JWT_SECRET, { expiresIn: ENUM.JWT_TIME })
    })

    it('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hashGenerate(1)
      expect(hash).toBe('tokenGenerate')
    })

    it('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => new Promise((resolve, reject) => reject(new Error('any error'))))
      await expect(sut.hashGenerate(1)).rejects.toThrow()
    })
    it('Should decrypt throw jwt', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => new Promise((resolve, reject) => reject(new Error('any error'))))
      await expect(sut.decrypt('hashCode')).rejects.toThrow()
    })
    it('Should return balid decrypt', async () => {
      const sut = makeSut()
      const decode = await sut.decrypt('hashCode')
      expect(decode).toEqual('decrypt')
    })
  })
})
