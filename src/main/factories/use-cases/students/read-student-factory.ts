import { ReadStudents } from '@data/use-cases/students/read/read-student'
import { Account } from '@infra/db/mysql/typeorm/repository/student/students-repository'

export const makeReadStudentFactory = () => {
  const studentRepository = new Account()
  return new ReadStudents(studentRepository)
}
