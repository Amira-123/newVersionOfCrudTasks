import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user';
  storedTheme=localStorage.getItem('theme-color')
  constructor(
    private sharedService:SharedService,
    private translate: TranslateService){
      translate.use('ar');
    }
  //theme
  selectThemeColor(theme:any){
    this.sharedService.getTheme().subscribe((res:any)=>{
      localStorage.setItem('theme-color',theme);
      this.storedTheme=res
    })
  }
}
