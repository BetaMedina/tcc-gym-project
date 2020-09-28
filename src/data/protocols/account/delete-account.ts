
export interface IDeleteAccountRepository{
  deleteRow (id:number):Promise<boolean> 
}
