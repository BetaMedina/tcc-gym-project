import { getRepository } from 'typeorm'
import { Students } from '../../entities/students-entities'
import { StudentModel } from '@domain/models/student/student'
import { ILoadStudentByIdRepository } from '@data/protocols/students/load-account-by-id'
import { ICreateStudentRepository } from '@data/protocols/students/create-student'
import { IStudentPayload } from '@domain/use-cases/student/create-student'
import { IListStudentRepository } from '@data/protocols/students/list-student'
import { IReadStudentRepository } from '@data/protocols/students/read-student'
import { IUpdateStudentRepository } from '@data/protocols/students/update-student'
import { IStudentUpdatePayload } from '@domain/use-cases/student/update-student'

export class Account implements ILoadStudentByIdRepository, ICreateStudentRepository, IListStudentRepository, IReadStudentRepository, IUpdateStudentRepository {
  async loadById (id: number): Promise<StudentModel> {
    return getRepository(Students).findOne(id)
  }

  async createRow (payload:IStudentPayload):Promise<StudentModel> {
    return getRepository(Students).create(payload).save()
  }

  async listRows ():Promise<StudentModel[]> {
    return getRepository(Students).find()
  }

  async readRows (id:number):Promise<StudentModel> {
    return getRepository(Students).findOne({ id })
  }

  async updateRows (id:number, payload:IStudentUpdatePayload):Promise<boolean> {
    const response = await getRepository(Students).update({ id }, {
      ...payload
    })
    return !!response
  }
}
