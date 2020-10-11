import { Encrypter } from '@data/protocols/encrypter/encrypt'
import { UserAccount } from '@domain/models/account/user-account'
import { AddAccountRepository, AddAccountParams } from '@domain/use-cases/account/add-account-db'
import { AddAccount } from '@data/protocols/account/add-account'

export class DbAddAccount implements AddAccountRepository {
  constructor (private addAccountReposity :AddAccount, private readonly hash:Encrypter) {}

  async create (accountData:AddAccountParams):Promise<UserAccount> {
    const hashsPassword = await this.hash.encrypt(accountData.password)
    const insertHashPassword = { ...accountData, password: hashsPassword }
    return this.addAccountReposity.createRow(insertHashPassword)
  }
}
