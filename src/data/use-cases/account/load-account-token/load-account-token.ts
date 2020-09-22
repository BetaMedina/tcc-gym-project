import { Decrypter, LoadAccountByIdRepository, LoadAccountByToken, UserAccount } from './load-account-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByIdRepository
  ) {}

  async load (accessToken: string): Promise<UserAccount> {
    try {
      const decrypt = await this.decrypter.decrypt(accessToken)
      if (!decrypt) {
        return null
      }
      return this.loadAccountByTokenRepository.loadById(decrypt.id)
    } catch (error) {
      return null
    }
  }
}