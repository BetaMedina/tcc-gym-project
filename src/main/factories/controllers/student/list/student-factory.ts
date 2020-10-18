import { makeListStudentFactory } from '@main/factories/use-cases/students/list-student-factory'
import { StudentController } from '@presentation/controllers/students/list/students'
import { makeLogErrorDecorator } from '@main/factories/main/decorators/LogErrorDecorator'

export const makeListStudentsController = () => {
  const loginController = new StudentController(makeListStudentFactory())
  return makeLogErrorDecorator(loginController)
}
