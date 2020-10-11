import { ILoadStudentByIdRepository } from '@data/protocols/students/load-account-by-id'
import { AuthenticationModel } from '@domain/models/account/authentication'
import { UserAccount } from '@domain/models/account/user-account'
import { StudentModel } from '@domain/models/student/student'
import { mockAccountModel, mockAuthenticationModel } from '@domain/tests/mock-user-model'
import { AddAccountParams, AddAccountRepository } from '@domain/use-cases/account/add-account-db'
import { Authentication, AuthenticationParams } from '@domain/use-cases/account/authenticated'
import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'
import { ILoadStudentById } from '@domain/use-cases/student/load-account-by-id'

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

export class FindUserStub implements ILoadStudentById {
  async load (id: number):Promise<StudentModel> {
    return {
      id: 1,
      name: 'validName',
      email: 'validMail',
      age: 22,
      height: 190,
      weigth: 99
    }
  }
}
