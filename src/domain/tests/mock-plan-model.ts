import { Plan } from '@domain/models/plans/plans'
import faker from 'faker'

export const mockPlanModel = ():Plan => ({
  id: faker.random.number(),
  name: faker.internet.userName(),
  price: faker.random.number(),
  duration: faker.random.word()
})
