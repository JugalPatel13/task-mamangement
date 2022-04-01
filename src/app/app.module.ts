import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task-management/task/task.component';
import { TaskUpdateComponent } from './task-management/task-update/task-update.component';
import { DailyTaskListComponent } from './task-management/daily-task-list/daily-task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskUpdateComponent,
    DailyTaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
