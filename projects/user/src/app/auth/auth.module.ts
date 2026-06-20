import { SharedModule } from './../../../../admin/src/app/shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({ declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ], imports: [CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule { }
