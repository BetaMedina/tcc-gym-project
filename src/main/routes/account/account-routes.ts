import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { makeDeleteAccountController } from '@main/factories/controllers/account/account-factory'
import { makeListAccountController } from '@main/factories/controllers/account/list/account-factory'
import { makeAuthMiddleware } from '@main/factories/middlewares/auth-factory'
import { adaptMiddleware } from '@main/adapters/express-middleware-adapter'
 
export default (route: Router):void => {
  route.delete('/account/:id', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeDeleteAccountController()))
  route.get('/accounts', adaptMiddleware(makeAuthMiddleware(true)), adaptRoute(makeListAccountController()))
}
