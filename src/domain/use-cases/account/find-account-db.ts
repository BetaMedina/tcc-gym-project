import { UserAccount } from '@domain/models/account/user-account'

export interface findUserReceived{
  id:Number,
}

export interface FindUserCase{
  find (payload:findUserReceived):Promise<UserAccount> 
}
