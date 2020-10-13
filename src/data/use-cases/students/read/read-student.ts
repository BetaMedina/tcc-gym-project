import { IReadStudentRepository } from '@data/protocols/students/read-student'
import { StudentModel } from '@domain/models/student/student'
import { IReadStudents } from '@domain/use-cases/student/read-student'

export class ReadStudents implements IReadStudents {
  constructor (private readonly listAccountRepository:IReadStudentRepository) {}
  read (id:number):Promise<StudentModel> {
    return this.listAccountRepository.readRows(id)
  }
}
