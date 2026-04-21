import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  getAllTasks(userId:string,tasksParams:any){
    let params= new HttpParams()
    Object.entries(tasksParams).forEach(([key,value]:any) => {
      if(value){
        params=params.append(key,value)
      }
    })
    return this.http.get(environment.baseApi+'/user-tasks/'+userId,{params})
  }
  completeTask(model:object){
    return this.http.put(environment.baseApi+'/complete',model)
  }
  getTaskDetails(id:any){
    return this.http.get(environment.baseApi+'/task/'+id)
  }
}
