import { SharedService } from './../../../../../../admin/src/app/shared/services/shared.service';
import { iRegister } from './../../interfaces/interface';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup,
   ValidationErrors,
   ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
})
export class RegisterComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  registerForm!:FormGroup;
  hide = true;
  constructor(private fb:FormBuilder,
    private service:AuthService,
    private toaster:ToastrService,
    private route:Router,
    private sharedService:SharedService)
    {
      this.selectThemeColor()
    }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.registerForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    },{validators:this.checkPassword})

  }
  register(){
    let model:iRegister={
      username:this.registerForm.value['username'],
      email:this.registerForm.value['email'],
      password:this.registerForm.value['password'],
      role:'user',
    }
    this.service.register(model).subscribe((res:any)=>{
      localStorage.setItem("token",res.token)
      this.toaster.success('success','register successfully');
      this.route.navigate(['/'])
    })
  }
  get username(){
    return this.registerForm.get('username')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }
 checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password===confirmPassword? null :{notmatch:true}
  };

  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res
    })
  }

}
