import { UserAccount } from '@domain/models/account/use-account'

export interface LoadAccountById {
  load(id:Number):Promise<UserAccount>
}
