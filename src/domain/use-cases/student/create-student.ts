import { StudentModel } from '@domain/models/student/student'

export interface IStudentPayload{
  name:string,
  email:string,
  age:number,
  height:number,
  weigth:number,
}

export interface ICreateStudent {
  create(payload:IStudentPayload):Promise<StudentModel>
}
