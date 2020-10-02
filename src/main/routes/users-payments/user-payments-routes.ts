import { Router } from 'express'
import { makeUserPaymentsController, makeListUserPaymentsController, makeUpdateUserPaymentsController } from '../../factories/controllers/users-payments'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/user-payment', adaptRoute(makeUserPaymentsController()))
  route.get('/user-payment', adaptRoute(makeListUserPaymentsController()))
  route.put('/user-payment/:id', adaptRoute(makeUpdateUserPaymentsController()))
}
