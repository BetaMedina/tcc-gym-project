import { IDeleteAccountRepository } from '@data/protocols/account/delete-account'
import { IDeleteAccount } from '@domain/use-cases/account/delete-account-db'

export class DeleteAccount implements IDeleteAccount {
  constructor (private readonly deleteAccountRepository:IDeleteAccountRepository) {}
  async delete (id:number):Promise<boolean> {
    return this.deleteAccountRepository.deleteRow(id)
  }
}
