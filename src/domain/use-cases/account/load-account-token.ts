import { UserAccount } from '@domain/models/account/user-account'

export interface LoadAccountByToken {
  load(accessToken: string, admin?:boolean):Promise<UserAccount>
}
