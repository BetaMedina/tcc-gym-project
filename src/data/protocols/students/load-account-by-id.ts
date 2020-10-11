import { StudentModel } from '@domain/models/student/student'

export interface ILoadStudentByIdRepository {
  loadById(id: number):Promise<StudentModel>
}
