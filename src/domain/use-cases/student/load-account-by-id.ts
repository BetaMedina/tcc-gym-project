import { StudentModel } from '@domain/models/student/student'

export interface ILoadStudentById {
  load(id:Number):Promise<StudentModel>
}
