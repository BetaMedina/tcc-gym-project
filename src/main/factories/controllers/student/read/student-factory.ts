import { StudentController } from '@presentation/controllers/students/read/students'
import { makeReadStudentFactory } from '@main/factories/use-cases/students/read-student-factory'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeReadStudentController = () => {
  const loginController = new StudentController(makeReadStudentFactory())
  return makeLogErrorDecorator(loginController)
}
