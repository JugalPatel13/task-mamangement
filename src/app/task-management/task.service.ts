import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task.state';

@Injectable({providedIn: 'root'})
export class TaskService {
  loading!:boolean;
  taskList: TaskState[] = [];
  selectedTask!: Task;
  
  constructor() { }
  
  save(task:Task) {
    const tasksToSave = this.taskList.flatMap(t => t.tasks);
    tasksToSave.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
    this.getTasks();
  }

  update(task:Task) {
    const tasksToUpdate = this.taskList.flatMap(t => t.tasks);
    const i = tasksToUpdate.findIndex(et=> et.id === task.id);
    tasksToUpdate[i] = task;
    localStorage.setItem('tasks', JSON.stringify(tasksToUpdate));
    this.getTasks();
  }

  selectTask(id?:number) {
    const tasksToSelectFrom = this.taskList.flatMap(t => t.tasks);
    const selectedValue = tasksToSelectFrom.find(t => t.id === id);
    if(selectedValue){
      this.selectedTask = selectedValue;
    }
  }

  getTasks(){
    this.loading = true;
    this.taskList = [];
    const tasksString = localStorage.getItem('tasks')
    if(tasksString != null){
      const tasks = JSON.parse(tasksString);
      tasks.forEach((t:Task) => {
        if (t.dueDate && t && (this.taskList.length === 0 || this.taskList.find(td => td.date === t.dueDate) === undefined)){
            const taskToAdd = new TaskState(t.dueDate);
            taskToAdd.tasks.push(t);
            this.taskList.push(taskToAdd);
        } else {
          const index = this.taskList.findIndex(existingList => existingList.date === t.dueDate );
          this.taskList[index].tasks.push(t);
        }
      })    
    }
    this.loading = false;
  }

  deleteTask(taskId?:number) {
    let tasksToDelete = this.taskList.flatMap(t => t.tasks);
    tasksToDelete = tasksToDelete.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasksToDelete));
    this.getTasks();
  }
}
