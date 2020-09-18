import { AddPlanReceived } from '@data/protocols/plan/add-plan-db'
import { Plan } from '@domain/models/plans/plans'
import { AddPlanCase } from '@domain/use-cases/plans/add-plan-db'
import { FindPlanCase, findPlanReceived } from '@domain/use-cases/plans/find-plan-db'
import { ListPlans } from '@domain/use-cases/plans/list-plan-db'
import { UpdatePlanCase, UpdatePlanReceived } from '@domain/use-cases/plans/update-plan-db'
import faker from 'faker'

export class AddPlanStub implements AddPlanCase {
  async create (payload: AddPlanReceived): Promise<Plan> {
    return { id: 1, ...payload }
  }
}

export class ListPlansStub implements ListPlans {
  async list ():Promise<Plan[]> {
    return [{
      id: faker.random.number(),
      name: faker.internet.userName(),
      price: faker.random.number(),
      duration: faker.random.words()
    }]
  }
}

export class FindPlanCaseStub implements FindPlanCase {
  async find (payload:findPlanReceived):Promise<Plan> {
    return {
      id: 1,
      name: faker.internet.userName(),
      price: faker.random.number(),
      duration: faker.random.words()

    }
  }
}

export class UpdatePlanCaseStub implements UpdatePlanCase {
  async update (payload:UpdatePlanReceived):Promise<Plan> {
    return payload
  }
}
