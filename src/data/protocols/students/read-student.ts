import { StudentModel } from '@domain/models/student/student'

export interface IReadStudentRepository {
  readRows(id:number):Promise<StudentModel>
}
