import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  hide = true;
  loginForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private service:AuthService,
    private toaster:ToastrService,
    private route:Router,
    private sharedService:SharedService
    ) { this.selectThemeColor()}

  ngOnInit(): void {
    this.createForm();

  }
  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      role: ['user']
    })
  }
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  login(){
   this.service.login(this.loginForm.value).subscribe((res:any)=>{
    localStorage.setItem("token", res.token)
      this.toaster.success('successfully', 'login sucess');
      this.route.navigate(['/'])
   })


  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res
    })
  }

}
