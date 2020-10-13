import { ICreateStudentRepository } from '@data/protocols/students/create-student'
import { StudentModel } from '@domain/models/student/student'
import { ICreateStudent, IStudentPayload } from '@domain/use-cases/student/create-student'

export class CreateStudent implements ICreateStudent {
  constructor (private readonly studentRepository:ICreateStudentRepository) {}

  create (payload:IStudentPayload):Promise<StudentModel> {
    return this.studentRepository.createRow(payload)
  }
}
