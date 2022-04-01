import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  task!:Task;
  title!:string;
  taskForm= this.fb.group({
    name:[null, Validators.required],
    description:[null, Validators.required],
    dueDate:[Date, [Validators.required, this.dateValidator()]],
    status:[{value:'', disabled: true}, Validators.required]
  });

  constructor(private fb:FormBuilder, private taskService:TaskService, 
    private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const url = this.activatedRoute.snapshot['url'];
    this.title = url[1].toString();
    if(this.title === 'edit') {
      this.updateForm();
    } else{
      this.resetForm();
    }
  }

  updateForm(){
    this.task = this.taskService.selectedTask;
    this.taskForm.patchValue({'name': this.task.name});
    this.taskForm.patchValue({'description': this.task.description});
    this.taskForm.patchValue({'dueDate': this.task.dueDate});
    this.taskForm.patchValue({'status': this.task.status});
  }

  onSubmit() {
    console.log(this.taskForm.get('dueDate')?.value);
    this.task = this.task ? this.task : new Task();
    this.task.name = this.taskForm.get('name')?.value;
    this.task.description = this.taskForm.get('description')?.value;
    this.task.dueDate = this.taskForm.get('dueDate')?.value;
    this.task.status = this.taskForm.get('status')?.value;
    if(this.task.id){
      this.taskService.update(this.task)
    } else{
      this.task.id = Math.random();
      this.taskService.save(this.task)
    }
    this.router.navigateByUrl('/task');
  }

  resetForm(){
    this.taskForm.reset();
    this.taskForm.patchValue({'status': TaskStatus.PENDING});
  }

  back(){
    this.resetForm();
    this.router.navigateByUrl('/task');
  }
   dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const minDate = new Date('2021-11-01').toLocaleDateString();
      const maxDate = new Date('2021-11-07').toLocaleDateString();
  
      if(!(control && control.value)) {
        return null;
      }
      return (new Date(control.value).toLocaleDateString() < minDate || new Date(control.value).toLocaleDateString() > maxDate) ? {invalidDate: 'You must have to pick date between ' + minDate +' and ' + maxDate }:null;
    }
}
}
