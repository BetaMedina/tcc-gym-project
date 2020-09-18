import { AuthenticationModel } from '@domain/models/account/authentication'
import { UserAccount } from '@domain/models/account/use-account'
import { mockAccountModel, mockAuthenticationModel } from '@domain/tests/mock-user-model'
import { AddAccountParams, AddAccountRepository } from '@domain/use-cases/account/add-account-db'
import { Authentication, AuthenticationParams } from '@domain/use-cases/account/authenticated'

export class AddAccountStub implements AddAccountRepository {
  async create (payload:AddAccountParams):Promise<UserAccount> {
    return { id: 1, ...payload }
  }
}

export class AuthenticationStub implements Authentication {
  async auth (authenticationParams: AuthenticationParams):Promise<AuthenticationModel> {
    return mockAuthenticationModel()
  }
}
