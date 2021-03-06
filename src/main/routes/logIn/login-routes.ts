import { Router } from 'express'
import { makeLogInController } from '../../factories/controllers/logIn'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/signin', adaptRoute(makeLogInController()))
}
