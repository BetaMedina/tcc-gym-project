import { UserAccount } from '@domain/models/account/use-account'

export interface LoadAccountByToken {
  load(accessToken: string):Promise<UserAccount>
}
