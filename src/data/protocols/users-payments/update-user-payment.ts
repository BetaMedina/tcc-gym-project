import { IUpdateUserPaymentReceived } from '@domain/use-cases/users-payments/update-users-payments'

export interface IUpdateUserPaymentRepository{
  updateRow (payload: IUpdateUserPaymentReceived):Promise<boolean> 
}
