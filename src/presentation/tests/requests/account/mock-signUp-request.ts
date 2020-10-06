import { HttpRequest } from '@presentation/protocols'

export const mockSignUpPostRequest = ():HttpRequest => ({
  body: {
    password: 'validPassword',
    name: 'validName',
    email: 'notvalid@email.com',
    confirmPassword: 'validPassword',
    age: 18
  }
})
