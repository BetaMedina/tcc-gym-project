import { UserAccount } from '@domain/models/account/use-account'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<UserAccount>
}
