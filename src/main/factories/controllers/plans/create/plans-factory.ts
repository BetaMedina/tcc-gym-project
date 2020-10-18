import { PlansController } from '@presentation/controllers/plans/create/plans-controller'
import { makePlanValidation } from './plans-validation'
import { makeAddPlanFactory } from '@main/factories/use-cases/plans/add-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makePlansController = () => {
  const createPlan = new PlansController(makePlanValidation(), makeAddPlanFactory())
  return makeLogErrorDecorator(createPlan)
}
