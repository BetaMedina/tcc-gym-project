import { HttpRequest } from '@presentation/protocols'

export const makeUserPlanRequest = ():HttpRequest => ({
  body: {
    userId: 1,
    planId: 1
  }
})

export const makeUserPlanUpdateRequest = ():HttpRequest => ({
  body: {
    id: 1,
    userId: 1,
    planId: 1
  }
})
