import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskUpdateComponent } from './task-management/task-update/task-update.component';
import { TaskComponent } from './task-management/task/task.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'task'
  },
  {
    path:'task',
    component: TaskComponent,
  },
  {
    path:'task/add',
    component: TaskUpdateComponent,
  },
  {
    path:'task/edit',
    component: TaskUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
