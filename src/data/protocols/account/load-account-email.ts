import { UserAccount } from '@domain/models/use-account'

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<UserAccount>
}
