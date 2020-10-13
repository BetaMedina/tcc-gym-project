import { Router } from 'express'
import { makeCreateStudentsController, makeListStudentsController } from '../../factories/controllers/student'
import { adaptRoute } from '../../adapters/express-router-adapter'

export default (route: Router):void => {
  route.post('/student', adaptRoute(makeCreateStudentsController()))
  route.get('/student', adaptRoute(makeListStudentsController()))
}
