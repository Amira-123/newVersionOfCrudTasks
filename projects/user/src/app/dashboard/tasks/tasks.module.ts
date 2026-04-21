import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    RouterModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    ListTasksComponent,
    TaskDetailsComponent
  ]
})
export class TasksModule { }
