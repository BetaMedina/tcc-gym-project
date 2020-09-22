import { Router } from 'express'
import { makeUserPlansController } from '../../factories/user-plans/create/user-plans-factory'
import { makeListUserPlans } from '../../factories/user-plans/list/user-plans-factory'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/user-plans', adaptRoute(makeUserPlansController()))
  route.get('/user-plans', adaptRoute(makeListUserPlans()))
}
