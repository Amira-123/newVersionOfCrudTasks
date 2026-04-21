import { ToastrService } from 'ngx-toastr';
import { SharedService } from './../../../../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskDetails:any;
  id:any
  storedTheme=localStorage.getItem('theme-color')
  constructor(private service:TasksService,
    private sharedService:SharedService,
    private activatedRoute:ActivatedRoute,
    private toaster:ToastrService,
    private route:Router) {
      this.id=this.activatedRoute.snapshot.params['id'];
      console.log(this.id)
    }

  ngOnInit(): void {
    this.getTaskDetails();
    this.selectThemeColor()
  }
  getTaskDetails(){
    this.service.getTaskDetails(this.id).subscribe((res:any)=>{
    this.taskDetails=res.tasks;


    })
  }
  complete(id:any){
    const model={
      id:id
    }
    this.service.completeTask(model).subscribe((res:any)=>{
      this.route.navigate(['/tasks'])
      this.toaster.success('complete task successfully','success')
      this.route.navigate(['/tasks'])
    })
  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res;
    })
  }

}
