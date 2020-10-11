import { UserAccount } from '@domain/models/account/user-account'

export interface AddAccountParams{
  name:string,
  email:string,
  password:string,
  isAdmin?:boolean,
  age:number
}

export interface AddAccountRepository{
  create (account:AddAccountParams):Promise<UserAccount> 
}
