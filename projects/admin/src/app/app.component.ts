import { SharedService } from './shared/services/shared.service';
import { Component, Inject } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  lang:any;
  storedTheme=localStorage.getItem('theme-color')

  constructor(private translate: TranslateService,
    private sharedService:SharedService,
    @Inject (DOCUMENT) private document:Document) {

  }

  ngOnInit(): void {
    if("lang" in localStorage){
      this.lang= localStorage.getItem("lang");
      this.translate.use(this.lang)

    }
    else{
      this.translate.use(this.translate.defaultLang)
    }
    this.selectlanguage(this.lang);

  }
  //lang
  selectlanguage(lang:any){
    this.sharedService.getlang().subscribe((res:any)=>{
      localStorage.setItem('lang',lang);
      this.lang=res;
      if("lang" in localStorage){
        this.lang= localStorage.getItem("lang");
        this.translate.use(this.lang)

      }
      else{
        this.translate.use(this.translate.defaultLang)
      }
    })
    ////direction
    let htmlTag=this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir=lang==="ar"?"rtl":"ltr";
    htmlTag.lang==='ar'?"ar":"en";


  }
  changeCssFile(lang:string){
    let headTag=this.document.getElementsByTagName('head')[0] as HTMLHeadElement;
    let existingLink=this.document.getElementById('langCss') as HTMLLinkElement;
    let bundlename=lang==='ar'? "arabicStyle.css":"englishStyle.css";
    if(existingLink){
      existingLink.href=bundlename
    }
    else{
      let newLink= this.document.createElement('link');
      newLink.rel="stylesheet";
      newLink.type="text.css";
    newLink.id='lang/Css';
    newLink.href=bundlename;
    headTag.appendChild(newLink)
   }

  }





  //theme
  selectThemeColor(theme:any){
    this.sharedService.getTheme().subscribe((res:any)=>{
      localStorage.setItem('theme-color',theme);
      this.storedTheme=res
    })

  }

}
