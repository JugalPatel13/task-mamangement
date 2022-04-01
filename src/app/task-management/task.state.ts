import { Task } from "./task.model";

export class TaskState {
    constructor(public date:Date, public tasks:Task[] = []){}

}

