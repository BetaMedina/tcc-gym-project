import { UserAccount } from '@domain/models/account/use-account'

export interface LoadAccountByIdRepository {
  loadById(id: number):Promise<UserAccount>
}
