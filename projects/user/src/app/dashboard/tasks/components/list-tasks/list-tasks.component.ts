import { ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './../../../../shared/services/shared.service';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-tasks',
    templateUrl: './list-tasks.component.html',
    styleUrls: ['./list-tasks.component.scss'],
    standalone: false
})
export class ListTasksComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  userData:any;
  allTasks:any;
  page=1;
  selectedStatus:string='In-Progress'
  constructor( private service:TasksService,
    private sharedService:SharedService,
    private toaster:ToastrService,
    ) {}

  ngOnInit(): void {
    this.getuserData();
    this.getAllTasks();
    this.selectThemeColor()
  }
  getuserData(){
    let token=JSON.stringify(localStorage.getItem('token'));
    this.userData= JSON.parse(window.atob(token.split('.')[1])) ;
  }
  getAllTasks(){
    let model={
      page:this.page,
      limit:10,
      status:this.selectedStatus
    }
    this.service.getAllTasks(this.userData.userId,model).subscribe((res:any)=>{
     this.allTasks=res.tasks;
    },
    (error)=>{
      this.allTasks=[]
    })
  }
  complete(index:any){
    const model={
      id:this.allTasks[index]._id
    }
    this.service.completeTask(model).subscribe((res:any)=>{
      this.getAllTasks();
      this.toaster.success('complete task successfully','success')

    })
  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res;
    })
  }
}
