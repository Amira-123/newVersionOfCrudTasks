import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({ declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ], imports: [CommonModule,
        AuthRoutingModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
