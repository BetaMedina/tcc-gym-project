import { Router } from 'express'
import { makePlansController } from '../../factories/plans/plans-factory'
import { adaptRoute } from '../../adapters/express-router-adapter'
 
export default (route: Router):void => {
  route.post('/plan', adaptRoute(makePlansController()))
}
