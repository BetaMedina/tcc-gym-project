import { getRepository } from 'typeorm'

import { Users } from '../../entities/users-entities'
import { AddAccountReceived } from '@data/protocols/add-account'
import { AddAccountRepository } from '@domain/use-cases/add-account-db'
import { UserAccount } from '@domain/models/use-account'

export class AddAccountRepo implements AddAccountRepository {
  public async createRow (payload: AddAccountReceived): Promise<UserAccount> {
    return getRepository(Users).create(payload).save()
  }
}
