import { UserAccount } from '@domain/models/account/user-account'

export interface LoadAccountByIdRepository {
  loadById(id: number):Promise<UserAccount>
}
