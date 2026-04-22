import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../../../shared/services/shared.service';
import { iStatus } from '../../interface/status';
export interface PeriodicElement {
  position:number;
  name: string;
  email: string;
  taskAssigned: string;

}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource:any
  setTimeOutId:any
  page=1;
  total:any
  displayedColumns: string[] = ['position','name', 'email', 'taskAssigned','actions'];
  storedTheme=localStorage.getItem('theme-color')
  constructor(private service:UsersService,
    private toaster :ToastrService,
    private sharedService:SharedService) {
     this.getDataFromSubject()
     }
  ngOnInit(): void {
    this.selectThemeColor()
    this.getuser();
  }

  getuser(){
    let model={
      page:this.page,
      limit:10,
      name:''
    }
    this.service.getuserData(model)
  }

  getDataFromSubject(){
    this.service.userData?.subscribe((res:any)=>{
      this.dataSource=res?.data
      this.total=res?.totalItem
    })
  }

  search(event:any) {
    let newArray=this.dataSource.filter((el:any) => el.username.toLowerCase()
      .includes(event.value.toLowerCase()));
    if(event.value){
      this.dataSource=newArray
    }
    else{
      this.getuser();
    }
  }



  deleteUser(id:string,index:number){
    if(this.dataSource[index].assignedTasks>0){
      this.toaster.error("You can't delete this user untile complete his tasks")
    }
    else{
      this.service.deleteUser(id).subscribe((res:any)=>{
        this.toaster.success('delete user successfully','success');
        this.getuser()
      })
    }
  }
  changeStatus(status:string,id:string,index:number){
    const model:iStatus={
      id,
      status
   }
    if(this.dataSource[index].assignedTasks>0){
      this.toaster.error(`You can't change status of
       this user untile complete his tasks`)
    }
    else{
      this.service.changeStatus(model).subscribe((res:any)=>{
        this.toaster.success('change user  status successfully','success');
        this.getuser()
      })
    }
  }
  changePage(event:any){
    this.page=event;
    this.getuser()
  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res;
    })
  }



}
