import { PlansController } from '@presentation/controllers/plans/read/plans-controller'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeReadPlanController = () => {
  const planController = new PlansController(makeReadPlanFactory())
  return makeLogErrorDecorator(planController)
}
