import { UserAccount } from '../load-account-token/load-account-token-protocols'
import { LoadAccountByIdRepository } from '@data/protocols/account/load-account-by-id'
import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'

export class DbLoadAccountById implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  load (id: number): Promise<UserAccount> {
    return this.loadAccountByIdRepository.loadById(id)
  }
}
