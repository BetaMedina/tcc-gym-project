import { Router } from 'express'
import { makeLogInController } from '../../factories/logIn'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/signin', adaptRoute(makeLogInController()))
}
