import { UserAccount } from '@domain/models/account/user-account'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<UserAccount>
}
