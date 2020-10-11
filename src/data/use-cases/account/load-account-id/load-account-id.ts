
import { LoadAccountById } from '@domain/use-cases/account/load-account-by-id'
import { ILoadStudentByIdRepository } from '@data/protocols/students/load-account-by-id'
import { StudentModel } from '@domain/models/student/student'
import { ILoadStudentById } from '@domain/use-cases/student/load-account-by-id'

export class DbLoadAccountById implements ILoadStudentById {
  constructor (
    private readonly loadAccountByIdRepository: ILoadStudentByIdRepository
  ) {}

  load (id: number):Promise<StudentModel> {
    return this.loadAccountByIdRepository.loadById(id)
  }
}
