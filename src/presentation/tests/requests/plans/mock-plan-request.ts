import { HttpRequest } from '@presentation/protocols'
import faker from 'faker'

export const mockPlanPostRequest = ():HttpRequest => ({
  body: {
    name: faker.internet.userName(),
    price: faker.random.number(),
    duration: faker.random.words()
  }
})

export const mockPlanReadRequest = ():HttpRequest => ({
  params: {
    id: 1
  }
})

export const mockPlanPutRequest = ():HttpRequest => ({
  params: {
    id: 1
  },
  body: {
    name: faker.internet.userName(),
    price: faker.random.number(),
    duration: faker.random.words()
  }
})
