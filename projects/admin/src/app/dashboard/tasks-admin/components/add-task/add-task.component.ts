
import { SharedService } from './../../../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from './../../services/tasks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  newTaskForm!:FormGroup;
  formsValueChange:any;
  fileName=''
  users:any;
  page=1;
  total:any
  constructor(
    @Inject (MAT_DIALOG_DATA)  public data:any,
    private fb:FormBuilder,
    private service:TasksService,
    private toaster:ToastrService,
    public dialog:MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private sharedService:SharedService,
    private userService:UsersService
  ) {this.getDataFromSubject() }

  ngOnInit(): void {
    this.createForm();
    this.selectThemeColor();

  }
  createForm(){
    this.newTaskForm=this.fb.group({
      title:[this.data?.title || '',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId?._id|| '',Validators.required],
      image:[this.data?.image || '',Validators.required],
      description:[this.data?.description || '',Validators.required],
      deadline:[this.data? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '',Validators.required]
    });
    this.formsValueChange=this.newTaskForm.value
  }

  get title(){
    return this.newTaskForm.get('title')
  }
  get userId(){
    return this.newTaskForm.get('userId')
  }
  get image(){
    return this.newTaskForm.get('image')
  }
  get description(){
    return this.newTaskForm.get('description')
  }
  get deadline(){
    return this.newTaskForm.get('deadline')
  }
  selectFile(event:any){
    this.fileName=event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
  }
  createTask(){
    let model= this.preparedFormData()
    this.service.createTask(model).subscribe((res:any)=>{
    this.toaster.success('success','create task success');
    this.dialog.close(true)
    },(error)=>{
      this.toaster.error(error.error.message)
    })
    console.log(this.newTaskForm)
  }

  preparedFormData(){
    let newDate= moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');
    let formData =new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
      if(key=='deadline'){
        formData.append(key,newDate)
      }else{
        formData.append(key,value)
      }
    });
    return formData
  }

  updateTask(){
    let model= this.preparedFormData()
    this.service.updateTask(model,this.data._id).subscribe((res:any)=>{
    this.toaster.success('success','update task success');
    this.dialog.close(true)
    },(error)=>{
      this.toaster.error(error.error.message)
    })

  }

  AddTask(){
    if(!this.data){
      this.createTask()
    }
    else{
      this.updateTask()
    }
  }
  checkChanges(){
    let hasChanges=false
    Object.keys(this.formsValueChange).forEach((item)=>{
      if(this.formsValueChange[item] !== this.newTaskForm.value[item]){
        hasChanges=true
      }
    })

    if(hasChanges){
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px',

      });
      dialogRef.afterClosed().subscribe();
    }
    else{
      this.dialog.close()
    }
  }

  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res;
    })
  }
  getDataFromSubject(){
   this.userService.userData.subscribe((res:any)=>{
      this.users=this.mappingData(res.data);
    })
  }
  mappingData(data:any[]){
    let newArray= data.map(item=>{
      return{
        name:item.username,
        id:item._id
      }
    })
    return newArray
  }

}
