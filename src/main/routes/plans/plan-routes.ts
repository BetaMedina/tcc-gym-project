import { Router } from 'express'
import { makePlansController, makeListPlansController, makeUpdatePlanController, makeReadPlanController } from '../../factories/plans'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/plan', adaptRoute(makePlansController()))
  route.get('/plan', adaptRoute(makeListPlansController()))
  route.put('/plan', adaptRoute(makeUpdatePlanController()))
  route.get('/plan/:id', adaptRoute(makeReadPlanController()))
}
