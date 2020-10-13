import { StudentModel } from '@domain/models/student/student'

export interface IReadStudents{
  read (id:number):Promise<StudentModel> 
}
