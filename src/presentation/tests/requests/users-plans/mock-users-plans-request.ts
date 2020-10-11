import { HttpRequest } from '@presentation/protocols'

export const makeUserPlanRequest = ():HttpRequest => ({
  body: {
    studentId: 1,
    planId: 1,
    startDate: new Date()
  }
})

export const makeUserPlanUpdateRequest = ():HttpRequest => ({
  body: {
    id: 1,
    studentId: 1,
    planId: 1
  }
})
