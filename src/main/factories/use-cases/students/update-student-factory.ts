import { UpdateStudents } from '@data/use-cases/students/update/update-student'
import { Account } from '@infra/db/mysql/typeorm/repository/student/students-repository'

export const makeUpdateStudentFactory = () => {
  const studentRepository = new Account()
  return new UpdateStudents(studentRepository)
}
