import { IUpdateStudentRepository } from '@data/protocols/students/update-student'
import { IStudentUpdatePayload, IUpdateStudents } from '@domain/use-cases/student/update-student'

export class UpdateStudents implements IUpdateStudents {
  constructor (private readonly updateStudentRepository:IUpdateStudentRepository) {}
  async update (id:number, payload:IStudentUpdatePayload):Promise<boolean> {
    return this.updateStudentRepository.updateRows(id, payload)
  }
}
