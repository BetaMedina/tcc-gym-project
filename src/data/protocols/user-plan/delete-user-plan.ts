
export interface IDeleteUserPlanRepository{
  deleteRow (id:number):Promise<boolean> 
}
