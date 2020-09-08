import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { AddPlanRepository, AddPlanReceived } from '@data/protocols/plan/add-plan-db'

import { ListPlans } from '@domain/use-cases/plans/list-plan-db'
import { Plan } from '@domain/models/plans/plans'

export class PlanRepository implements AddPlanRepository, ListPlans {
  async createRow (payload:AddPlanReceived):Promise<Plan> {
    return getRepository(Plans).create(payload).save()
  }

  async list ():Promise<Plans[]> {
    return getRepository(Plans).find()
  }
}
