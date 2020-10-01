import { Router } from 'express'
import { makeUserPaymentsController } from '../../factories/controllers/users-payments/create/users-payments-factory'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/user-payment', adaptRoute(makeUserPaymentsController()))
}
