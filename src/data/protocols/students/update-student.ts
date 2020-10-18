import { IStudentUpdatePayload } from '@domain/use-cases/student/update-student'

export interface IUpdateStudentRepository {
  updateRows(id:number, payload:IStudentUpdatePayload):Promise<boolean>
}
