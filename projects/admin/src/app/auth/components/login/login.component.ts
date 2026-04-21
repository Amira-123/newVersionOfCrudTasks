import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../shared/services/shared.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  hide = true;
  lang:any
  loginForm!: FormGroup
  constructor(private fb: FormBuilder,
    private service: LoginService,
    private toaster: ToastrService,
    private route: Router,
    private sharedService:SharedService)
     { }

  ngOnInit(): void {
    this.createForm();
    this.selectThemeColor();
    // this.selectlanguage()
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      role: ['admin']
    })
  }
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  Login() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem("token", res.token)
      this.toaster.success('successfully', 'login sucess');
      this.route.navigate(['/tasks'])
    })
  }



  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res
    })
  }

}

