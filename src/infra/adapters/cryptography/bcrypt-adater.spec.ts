import { BcrypAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = (): BcrypAdapter => {
  return new BcrypAdapter()
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.encrypt('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', 10)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hash = await sut.encrypt('any_value')
      expect(hash).toBe('hash')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => new Promise((resolve, reject) => reject(new Error('any error'))))
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
