export interface IStudentUpdatePayload{
  name:string,
  email:string,
  age:number,
  height:number,
  weigth:number,
}

export interface IUpdateStudents{
  update (id:number, payload:IStudentUpdatePayload):Promise<boolean> 
}
