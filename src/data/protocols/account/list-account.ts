import { UserAccount } from '@domain/models/account/user-account'

export interface IListAccountsRepository{
  listRows ():Promise<UserAccount[]> 
}
