import { PlansController } from '@presentation/controllers/plans/update/plans-controller'
import { makeUpdatePlanFactory } from '@main/factories/use-cases/plans/update-plan-factory'
import { makeReadPlanFactory } from '@main/factories/use-cases/plans/read-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUpdatePlanController = () => {
  const planUpdate = new PlansController(makeReadPlanFactory(), makeUpdatePlanFactory())
  return makeLogErrorDecorator(planUpdate)
}
