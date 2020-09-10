import { ListPlansController } from '@presentation/controllers/plans/list/plans-controller'
import { ListPlansCase } from '@data/use-cases/plans/list/list-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeListPlansController = () => {
  const repository = new PlanRepository()
  const listPlansCase = new ListPlansCase(repository)
  return new ListPlansController(listPlansCase)
}
