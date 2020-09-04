import { Router } from 'express'
import { makeSignUpController } from '../../factories/signUp/signUp-factory'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
