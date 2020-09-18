import { AddAccount } from '@data/protocols/account/add-account'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { UserAccount } from '@domain/models/account/use-account'
import { mockAccountModel } from '@domain/tests/mock-user-model'
import { AddAccountParams } from '@domain/use-cases/account/add-account-db'

export class AddAccountReposityStub implements AddAccount {
  async createRow (accountData:AddAccountParams):Promise<UserAccount> {
    const fakeAccount = mockAccountModel()
    return new Promise(resolve => resolve(fakeAccount))
  }
}

export class LoadAccountByEmailStub implements LoadAccountByEmailRepository {
  async loadByEmail (email:string):Promise<UserAccount> {
    return mockAccountModel()
  }
}
