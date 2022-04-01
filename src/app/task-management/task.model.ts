export enum TaskStatus {
    PENDING ='PENDING',
    COMPLETED = 'COMPLETED'
   }
   
   export class Task{
       constructor(public id?:number, public name?:string, public description?:string, public dueDate?:Date, public status?: TaskStatus){}
   }