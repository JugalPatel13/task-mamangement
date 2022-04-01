import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TaskStatus } from '../task.model';
import { TaskService } from '../task.service';
import { TaskState } from '../task.state';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html'
})
export class DailyTaskListComponent implements OnInit {
  loading =false;
  @Input() taskList!: TaskState;

  constructor(private taskService:TaskService, private router :Router) { }

  ngOnInit(): void {}

  getStatus(item?:Task): boolean {
    if(item){
    return (item.status === TaskStatus.COMPLETED ? true : false);
    }
    return false;
  }

  updateTaskStatus(task:Task){
    task.status = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED :TaskStatus.PENDING;
    this.taskService.update(task);
  }

  delete(id?:number){ 
    this.taskService.deleteTask(id);
    this.loading = true;
    this.taskList.tasks = this.taskList.tasks.filter(tl => tl.id !== id);
    setTimeout(() => this.loading = false,500);
  }

  edit(id?:number) {    
    this.taskService.selectTask(id);
    this.router.navigateByUrl('/task/edit');
  }
}
