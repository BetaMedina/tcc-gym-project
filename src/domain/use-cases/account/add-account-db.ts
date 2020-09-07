import { AddAccountReceived } from '@data/protocols/account/add-account'
import { UserAccount } from '@domain/models/use-account'

export interface AddAccountRepository{
  createRow (account:AddAccountReceived):Promise<UserAccount> 
}
