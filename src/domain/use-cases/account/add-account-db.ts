import { AddAccountReceived } from '@data/protocols/account/add-account'
import { UserAccount } from '@domain/models/account/use-account'

export interface AddAccountRepository{
  create (account:AddAccountReceived):Promise<UserAccount> 
}
