import { Encrypter } from '@data/protocols/encrypter/encrypt'
import { UserAccount } from '@domain/models/use-account'
import { AddAccountRepository } from '@domain/use-cases/add-account-db'
import { AddAccount, AddAccountReceived } from '@data/protocols/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (private addAccountReposity :AddAccountRepository, private readonly hash:Encrypter) {}

  async create (accountData:AddAccountReceived):Promise<UserAccount> {
    const hashsPassword = await this.hash.encrypt(accountData.password)
    const insertHashPassword = { ...accountData, password: hashsPassword }
    return this.addAccountReposity.createRow(insertHashPassword)
  }
}
