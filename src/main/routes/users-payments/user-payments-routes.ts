import { Router } from 'express'
import { makeUserPaymentsController, makeListUserPaymentsController, makeUpdateUserPaymentsController, makeReadUserPaymentsController } from '../../factories/controllers/users-payments'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'
 
export default (route: Router):void => {
  route.post('/user-payment', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUserPaymentsController()))
  route.get('/user-payment', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeListUserPaymentsController()))
  route.put('/user-payment/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeUpdateUserPaymentsController()))
  route.get('/user-payment/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeReadUserPaymentsController()))
}
