import { Router } from 'express'
import { makeUserPlansController } from '../../factories/user-plans/create/user-plans-factory'
import { makeListUserPlans } from '../../factories/user-plans/list/user-plans-factory'
import { makeUpdateUserPlans } from '../../factories/user-plans/update/user-plan-factory'
import { makeReadUserPlans } from '../../factories/user-plans/read/user-plan-factory'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/user-plans', adaptRoute(makeUserPlansController()))
  route.get('/user-plans', adaptRoute(makeListUserPlans()))
  route.put('/user-plans', adaptRoute(makeUpdateUserPlans()))
  route.get('/user-plans/:id', adaptRoute(makeReadUserPlans()))
}
