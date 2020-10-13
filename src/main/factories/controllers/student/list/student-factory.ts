import { makeListStudentFactory } from '@main/factories/use-cases/students/list-student-factory'
import { StudentController } from '@presentation/controllers/students/list/students'

import { LogErrorDecorator } from '@main/decorators/log.decorator'
import { LogMongoRepository } from '@infra/db/mongo/repository/log.repository'

export const makeListStudentsController = () => {
  const loginController = new StudentController(makeListStudentFactory())

  const logRepository = new LogMongoRepository() 
  return new LogErrorDecorator(loginController, logRepository)
}
