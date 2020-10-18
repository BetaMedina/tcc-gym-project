import { Router } from 'express'
import { makeUserPlansController, makeListUserPlans, makeUpdateUserPlans, makeReadUserPlans, makeDeleteUserPlansController } from '../../factories/controllers/user-plans'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'
 
export default (route: Router):void => {
  route.post('/user-plans', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUserPlansController()))
  route.get('/user-plans', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeListUserPlans()))
  route.put('/user-plans', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUpdateUserPlans()))
  route.get('/user-plans/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeReadUserPlans()))
  route.delete('/user-plans/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeDeleteUserPlansController()))
}
