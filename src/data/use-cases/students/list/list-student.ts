import { IListAccountsRepository } from '@data/protocols/account/list-account'
import { IListStudentRepository } from '@data/protocols/students/list-student'
import { StudentModel } from '@domain/models/student/student'
import { IListStudents } from '@domain/use-cases/student/list-student'

export class ListStudent implements IListStudents {
  constructor (private readonly listAccountRepository:IListStudentRepository) {}
  list ():Promise<StudentModel[]> {
    return this.listAccountRepository.listRows()
  }
}
