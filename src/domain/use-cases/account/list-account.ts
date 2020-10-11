import { UserAccount } from '@domain/models/account/user-account'

export interface IListUser{
  getAll ():Promise<UserAccount[]> 
}
