import { UserAccount } from '@domain/models/account/user-account'

export interface LoadAccountById {
  load(id:Number):Promise<UserAccount>
}
