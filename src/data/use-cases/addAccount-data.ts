import { UserAccount } from '../../domain/models/use-account'
import { AddAccountRepository } from '../../domain/use-cases/add-account-db'
import { AddAccount, AddAccountReceived } from '../protocols/add-account'

export class DbAddAccount implements AddAccount {
  constructor (private addAccountReposity :AddAccountRepository) {}

  async create (accountData:AddAccountReceived):Promise<UserAccount> {
    return this.addAccountReposity.createRow(accountData)
  }
}
