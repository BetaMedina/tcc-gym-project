import { getRepository } from 'typeorm'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { Users } from '../../entities/users-entities'
import { AddAccountReceived, AddAccount } from '@data/protocols/account/add-account'
import { UserAccount } from '@domain/models/account/user-account'
import { LoadAccountByIdRepository } from '@data/protocols/account/load-account-by-id'
import { IDeleteAccountRepository } from '@data/protocols/account/delete-account'
import { IListAccountsRepository } from '@data/protocols/account/list-account'

export class Account implements AddAccount, LoadAccountByEmailRepository, LoadAccountByIdRepository, IDeleteAccountRepository, IListAccountsRepository {
  async createRow (payload: AddAccountReceived): Promise<UserAccount> {
    return getRepository(Users).create(payload).save()
  }

  async loadByEmail (email: string): Promise<UserAccount> {
    return getRepository(Users).findOne({ email })
  }

  async loadById (id: number): Promise<UserAccount> {
    return getRepository(Users).findOne(id)
  }

  async deleteRow (id:number):Promise<boolean> {
    return !!getRepository(Users).delete({ id })
  }

  async listRows (): Promise<UserAccount[]> {
    return getRepository(Users).find({ select: ['id', 'name', 'email', 'age', 'isAdmin', 'createdAt', 'updatedAt'] })
  }
}
