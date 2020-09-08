import { Encrypter } from '@data/protocols/encrypter/encrypt'
import { AddAccountReceived, AddAccount } from '@data/protocols/account/add-account'
import { UserAccount } from '@domain/models/account/use-account'
import { AddAccountRepository } from '@domain/use-cases/account/add-account-db'

export class DbAddAccount implements AddAccountRepository {
  constructor (private addAccountReposity :AddAccount, private readonly hash:Encrypter) {}

  async create (accountData:AddAccountReceived):Promise<UserAccount> {
    const hashsPassword = await this.hash.encrypt(accountData.password)
    const insertHashPassword = { ...accountData, password: hashsPassword }
    return this.addAccountReposity.createRow(insertHashPassword)
  }
}
