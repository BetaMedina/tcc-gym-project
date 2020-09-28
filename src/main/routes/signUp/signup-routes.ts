import { Router } from 'express'
import { makeSignUpController } from '../../factories/controllers/logIn'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
