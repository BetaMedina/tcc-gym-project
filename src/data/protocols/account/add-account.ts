import { UserAccount } from '../../../domain/models/use-account'

export interface AddAccountReceived{
  name:string,
  email:string,
  password:string
}

export interface AddAccount{
  create (account:AddAccountReceived):Promise<UserAccount> 
}
