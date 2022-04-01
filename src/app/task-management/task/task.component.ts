import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskState } from '../task.state';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  loading = false;
  taskList:TaskState[] = [];
  constructor(private taskService:TaskService, private router:Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.taskService.getTasks();
    setTimeout(() => {
      this.taskList = this.taskService.taskList;
      this.loading = false;
    }, 2000);
  }

  addNew(){
    this.router.navigateByUrl('/task/add');
  }
}
