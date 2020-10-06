import { UserAccount } from '@domain/models/account/use-account'

export interface IListUser{
  getAll ():Promise<UserAccount[]> 
}
