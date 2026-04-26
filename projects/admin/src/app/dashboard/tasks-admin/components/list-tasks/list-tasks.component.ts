import { UsersService } from './../../../manage-users/services/users.service';
import { SharedService } from './../../../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
export interface PeriodicElement {
  position:number;
  title: string;
  user: string;
  Deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  page:any=1;
  total:any;
  setTimeOutId:any;
  users:any;
  dataSource:any[]=[];
  filteration:any={
    page:this.page,
    limit:4
  }

  Status=[
    {name:'In-Progress'},
    {name:'pending'}
  ]
  displayedColumns: string[] = ['position', 'image', 'title', 'user', 'deadline', 'status','actions'];

  constructor(
    private service: TasksService,
    public dialog: MatDialog,
    private toaster: ToastrService,
    private sharedService:SharedService,
    private userService:UsersService
    )
    {this.getDataFromSubject()}

  ngOnInit(): void {
    this.selectThemeColor()
    this.getAllTasks()
    this.getAllUsers()

  }
  getAllTasks() {
    this.service.getAllTasks(this.filteration).subscribe((res: any) => {
      this.dataSource = this.mappingTasksData(res.tasks);
      this.total=res.totalItems;
    })
  }
  mappingTasksData(data:any[]) {
    let newTasks = data.map(item => {

      return {
        ...item,
        user:item.userId?.username
      }
    })

    return newTasks
  }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTasks()
    });
  }
  updateTask(data:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:data,
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTasks()
    });
  }
  deleteTask(id:any){
    let taskId=id._id;
    this.service.deleteTask(taskId).subscribe((res)=>{
      this.toaster.success('sucess','delete task success');
      this.getAllTasks()
    })
  }

  // search part
  search(event:any){
    this.filteration['keyword']=event.value;
    this.page=1;
    this.filteration['page']=1
    clearTimeout(this.setTimeOutId)
    this.setTimeOutId= setTimeout(()=>{
      this.getAllTasks()
    },2000)
  }
  selectUser(event:any){
    this.filteration['userId']=event.value;
    this.page=1;
    this.filteration['page']=1
    this.getAllTasks()
  }
  selectStatus(event:any){
    this.filteration['status']=event.value;
    this.page=1;
    this.filteration['page']=1
    this.getAllTasks()
  }
  selectDate(event:any,type:any){
    this.filteration[type]=moment(event.value).format('DD-MM-YYYY');
    this.page=1;
    this.filteration['page']=1

    if(type=='toDate' && this.filteration['toDate'] !=='Invalid date'){
      this.getAllTasks()
    }
  }
  ///pagination method
  changePage(event:any){
    this.page=event;
    this.filteration['page']=event
    this.getAllTasks()
  }
  getAllUsers(){
    this.userService.getuserData()
  }
  getDataFromSubject(){
   this.userService.userData.subscribe((res:any)=>{
      this.users=this.mappingData(res.data);
    })
  }
  mappingData(data:any[]){
    let newArray= data?.map(item=>{
      return{
        name:item.username,
        id:item._id
      }
    })
    return newArray
  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res;
    })
  }


}

