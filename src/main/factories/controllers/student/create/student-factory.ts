import { makeAddStudentFactory } from '@main/factories/use-cases/students/add-student-factory'
import { Students } from '@presentation/controllers/students/create/students'
import { makeStudentValidation } from './student-validation'

import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'

export const makeCreateStudentsController = () => {
  const loginController = new Students(makeStudentValidation(), makeAddStudentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(loginController, logRepository)
}
