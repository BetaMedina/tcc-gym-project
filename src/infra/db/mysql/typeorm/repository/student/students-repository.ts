import { getRepository } from 'typeorm'
import { Students } from '../../entities/students-entities'
import { StudentModel } from '@domain/models/student/student'
import { ILoadStudentByIdRepository } from '@data/protocols/students/load-account-by-id'

export class Account implements ILoadStudentByIdRepository {
  async loadById (id: number): Promise<StudentModel> {
    return getRepository(Students).findOne(id)
  }
}
