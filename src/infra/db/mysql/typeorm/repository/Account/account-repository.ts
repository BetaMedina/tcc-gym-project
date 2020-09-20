import { getRepository } from 'typeorm'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { Users } from '../../entities/users-entities'
import { AddAccountReceived, AddAccount } from '@data/protocols/account/add-account'
import { UserAccount } from '@domain/models/account/use-account'
import { LoadAccountByIdRepository } from '@data/protocols/account/load-account-by-id'

export class Account implements AddAccount, LoadAccountByEmailRepository, LoadAccountByIdRepository {
  async createRow (payload: AddAccountReceived): Promise<UserAccount> {
    return getRepository(Users).create(payload).save()
  }

  async loadByEmail (email: string): Promise<UserAccount> {
    return getRepository(Users).findOne({ email })
  }

  async loadById (id: number): Promise<UserAccount> {
    return getRepository(Users).findOne(id)
  }
}
