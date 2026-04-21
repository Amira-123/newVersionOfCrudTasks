import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { LoginRequest } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(model:LoginRequest){
    return this.http.post(environment.baseApi.replace('tasks','auth') + '/login',model)
  }
}
