import { StudentModel } from '@domain/models/student/student'

export interface IListStudents{
  list ():Promise<StudentModel[]> 
}
