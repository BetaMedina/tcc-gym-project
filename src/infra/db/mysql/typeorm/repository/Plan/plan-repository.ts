import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { AddPlanRepository, AddPlanReceived } from '@data/protocols/plan/add-plan-db'

import { Plan } from '@domain/models/plans/plans'
import { ListPlansRepository } from '@data/protocols/plan/list-plan-db'
import { ReadPlanRepository } from '@data/protocols/plan/read-plan-db'
import { UpdatePlanRepository } from '@data/protocols/plan/update-plan-db'
import { findPlanReceived } from '@domain/use-cases/plans/find-plan-db'
import { UpdatePlanReceived } from '@domain/use-cases/plans/update-plan-db'
import { IDeletePlanRepository } from '@data/protocols/plan/delete-plan-db'

export class PlanRepository implements AddPlanRepository, ListPlansRepository, ReadPlanRepository, UpdatePlanRepository, IDeletePlanRepository {
  async createRow (payload:AddPlanReceived):Promise<Plan> {
    return getRepository(Plans).create(payload).save()
  }

  async listRows ():Promise<Plans[]> {
    return getRepository(Plans).find()
  }

  async readRows (id:findPlanReceived):Promise<Plans> {
    return getRepository(Plans).findOne(id)
  }

  async updateRows (payload:UpdatePlanReceived):Promise<boolean> {
    return !!getRepository(Plans).update({ id: payload.id }, { ...payload })
  }
  
  async deleteRow (id:number):Promise<boolean> {
    return !!getRepository(Plans).delete({ id })
  }
}
