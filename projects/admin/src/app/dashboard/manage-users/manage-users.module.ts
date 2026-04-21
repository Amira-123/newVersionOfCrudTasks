import { RouterModule } from '@angular/router';
import { MaterialModule } from './../../material/material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    UsersComponent
  ]
})
export class ManageUsersModule { }
