import { ilogin, iRegister } from './../interfaces/interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(model:ilogin){
    return this.http.post(environment.baseApi.replace('tasks','auth')+'/login',model)
  }
  register(model:iRegister){
    return this.http.post(environment.baseApi.replace('tasks','auth')+'/createAccount',model)
  }

}
