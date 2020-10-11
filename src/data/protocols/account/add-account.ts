import { UserAccount } from '@domain/models/account/user-account'
export interface AddAccountReceived{
  name:string,
  email:string,
  password:string
}

export interface AddAccount{
  createRow (account:AddAccountReceived):Promise<UserAccount> 
}
