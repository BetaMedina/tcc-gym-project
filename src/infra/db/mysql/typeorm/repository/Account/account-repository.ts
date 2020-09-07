import { getRepository } from 'typeorm'
import { LoadAccountByEmailRepository } from '@data/protocols/account/load-account-email'
import { Users } from '../../entities/users-entities'
import { AddAccountReceived } from '@data/protocols/account/add-account'
import { AddAccountRepository } from '@domain/use-cases/account/add-account-db'
import { UserAccount } from '@domain/models/use-account'

export class Account implements AddAccountRepository, LoadAccountByEmailRepository {
  async createRow (payload: AddAccountReceived): Promise<UserAccount> {
    return getRepository(Users).create(payload).save()
  }

  async loadByEmail (email: string): Promise<UserAccount> {
    return getRepository(Users).findOne({ email })
  }
}
