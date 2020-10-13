import { ListStudent } from '@data/use-cases/students/list/list-student'
import { Account } from '@infra/db/mysql/typeorm/repository/student/students-repository'

export const makeListStudentFactory = () => {
  const studentRepository = new Account()
  return new ListStudent(studentRepository)
}
