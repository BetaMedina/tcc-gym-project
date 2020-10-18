import { Router } from 'express'
import { makePlansController, makeListPlansController, makeUpdatePlanController, makeReadPlanController, makeDeletePlanController } from '../../factories/controllers/plans'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'

export default (route: Router):void => {
  route.post('/plan', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makePlansController()))
  route.get('/plan', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeListPlansController()))
  route.put('/plan', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUpdatePlanController()))
  route.get('/plan/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeReadPlanController()))
  route.delete('/plan/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeDeletePlanController()))
}
