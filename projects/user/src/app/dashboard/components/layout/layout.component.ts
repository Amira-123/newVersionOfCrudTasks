import { SharedService } from './../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent implements OnInit {
  storedTheme=localStorage.getItem('theme-color')
  constructor(private route:Router,
    private sharedService:SharedService) { }

  ngOnInit(): void {
    this.selectThemeColor()
  }
  logout(){
    localStorage.removeItem("token");
    this.route.navigate(['/auth/'])
  }
  //theme
  selectThemeColor(){
    this.sharedService.getTheme().subscribe((res:any)=>{
    this.storedTheme=res
    })
  }

}
