import { ListPlansController } from '@presentation/controllers/plans/list/plans-controller'

import { makeListPlansFactory } from '@main/factories/use-cases/plans/list-plan-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeListPlansController = () => {
  const listPlan = new ListPlansController(makeListPlansFactory())
  return makeLogErrorDecorator(listPlan)
}
