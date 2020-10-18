import { PlansController } from '@presentation/controllers/plans/delete/plans-controller'
import { makeDeletePlanFactory } from '@main/factories/use-cases/plans/delete-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeDeletePlanController = () => {
  const deletePlan = new PlansController(makeDeletePlanFactory())
  return makeLogErrorDecorator(deletePlan)
}
