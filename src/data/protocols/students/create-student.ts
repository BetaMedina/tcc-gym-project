import { StudentModel } from '@domain/models/student/student'
import { IStudentPayload } from '@domain/use-cases/student/create-student'

export interface ICreateStudentRepository {
  createRow(payload:IStudentPayload):Promise<StudentModel>
}
