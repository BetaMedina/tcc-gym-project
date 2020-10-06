// 

import { IListAccountsRepository } from '@data/protocols/account/list-account'
import { IListUser } from '@domain/use-cases/account/list-account'
import { UserAccount } from '../load-account-token/load-account-token-protocols'

export class ListAccount implements IListUser {
  constructor (private readonly listAccountRepository:IListAccountsRepository) {}
  async getAll ():Promise<UserAccount[]> {
    return this.listAccountRepository.listRows()
  }
}
