import { CreateStudent } from '@data/use-cases/students/create/add-student'
import { Account } from '@infra/db/mysql/typeorm/repository/student/students-repository'

export const makeAddStudentFactory = () => {
  const studentRepository = new Account()
  return new CreateStudent(studentRepository)
}
