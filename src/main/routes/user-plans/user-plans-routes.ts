import { Router } from 'express'
import { makeUserPlansController, makeListUserPlans, makeUpdateUserPlans, makeReadUserPlans } from '../../factories/controllers/user-plans'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/user-plans', adaptRoute(makeUserPlansController()))
  route.get('/user-plans', adaptRoute(makeListUserPlans()))
  route.put('/user-plans', adaptRoute(makeUpdateUserPlans()))
  route.get('/user-plans/:id', adaptRoute(makeReadUserPlans()))
}
