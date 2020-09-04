import { AddAccountReceived } from '../../data/protocols/add-account'
import { UserAccount } from '../models/use-account'

export interface AddAccountRepository{
  createRow (account:AddAccountReceived):Promise<UserAccount> 
}
