import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { makeDeleteAccountController } from '@main/factories/controllers/account/account-factory'
import { makeListAccountController } from '@main/factories/controllers/account/list/account-factory'
 
export default (route: Router):void => {
  route.delete('/account/:id', adaptRoute(makeDeleteAccountController()))
  route.get('/accounts', adaptRoute(makeListAccountController()))
}
