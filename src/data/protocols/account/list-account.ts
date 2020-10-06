import { UserAccount } from '@domain/models/account/use-account'

export interface IListAccountsRepository{
  listRows ():Promise<UserAccount[]> 
}
