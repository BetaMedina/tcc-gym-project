import { makeAddStudentFactory } from '@main/factories/use-cases/students/add-student-factory'
import { Students } from '@presentation/controllers/students/create/students'
import { makeStudentValidation } from './student-validation'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeCreateStudentsController = () => {
  const loginController = new Students(makeStudentValidation(), makeAddStudentFactory())
  return makeLogErrorDecorator(loginController)
}
