import { ListPlansCase } from '@data/use-cases/plans/list/list-plan'
import { PlanRepository } from '@infra/db/mysql/typeorm/repository/Plan/plan-repository'

export const makeListPlansFactory = () => {
  const repository = new PlanRepository()
  return new ListPlansCase(repository)
}
