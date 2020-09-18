import { UserAccount } from '@domain/models/account/use-account'

export interface LoadAccountByTokenRepository {
  async loadById(id: number):Promise<UserAccount>
}
