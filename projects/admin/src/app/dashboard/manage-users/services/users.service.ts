import { BehaviorSubject } from 'rxjs';
import { iStatus } from './../interface/status';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userData= new BehaviorSubject({})
  constructor(private http:HttpClient) { }
  getAllUsers(filter:any){
    let params= new HttpParams()
    if(filter){
      Object.entries(filter).forEach(([key,value]:any) => {
        if(value){
          params=params.append(key,value)
        }
      })
    }
    return this.http.get(environment.baseApi.replace('tasks','auth')+'/users',{params})
  }
  getuserData(model?:any){
    this.getAllUsers(model).subscribe((res:any)=>{
      this.userData.next({
        data:res?.users,
        totalItem:res?.totalItems
      })
    })
  }
  deleteUser(id:any){
    return this.http.delete(environment.baseApi.replace('tasks','auth')+'/user/'+id)
  }
  changeStatus(status:iStatus){
    return this.http.put(environment.baseApi.replace('tasks','auth')+'/user-status',status)
  }
}
