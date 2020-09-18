import { HttpRequest } from '@presentation/protocols'

export const mockSignInPostRequest = ():HttpRequest => ({
  body: {
    email: 'validMail',
    password: 'validPassword'
  }
})
