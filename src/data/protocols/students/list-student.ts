import { StudentModel } from '@domain/models/student/student'

export interface IListStudentRepository {
  listRows():Promise<StudentModel[]>
}
