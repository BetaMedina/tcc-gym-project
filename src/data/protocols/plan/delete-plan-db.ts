
export interface IDeletePlanRepository{
  deleteRow (id:number):Promise<boolean> 
}
