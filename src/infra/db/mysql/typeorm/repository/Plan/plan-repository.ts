import { getRepository } from 'typeorm'
import { Plans } from '../../entities/plans-entities'
import { AddPlanRepository } from '@data/protocols/plan/add-plan-db'
import { AddPlanReceived } from '@domain/use-cases/plans/add-plan-db'

export class Plan implements AddPlanRepository {
  async createRow (payload:AddPlanReceived):Promise<Plans> {
    return getRepository(Plans).create(payload).save()
  }
}
