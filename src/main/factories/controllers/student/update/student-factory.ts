import { makeUpdateStudentFactory } from '@main/factories/use-cases/students/update-student-factory'
import { StudentController } from '@presentation/controllers/students/update/students'
import { makeStudentValidation } from './student-validation'
import { makeReadStudentFactory } from '@main/factories/use-cases/students/read-student-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeUpdateStudentsController = () => {
  const loginController = new StudentController(makeStudentValidation(), makeReadStudentFactory(), makeUpdateStudentFactory())
  return makeLogErrorDecorator(loginController)
}
