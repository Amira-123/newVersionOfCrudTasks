import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public color:any
  public colorTheme=new BehaviorSubject<any>([]);
  public lang:any
  public langSelect=new BehaviorSubject<any>([]);
  constructor() { }
  getColorTheme(){
    if('theme-color' in localStorage) {
      this.color=localStorage.getItem("theme-color");
      this.colorTheme.next(this.color)
    }

  }
  getTheme(){
    this.getColorTheme();
    return this.colorTheme.asObservable()
  }

  getselectedLanguage(){
    if('lang' in localStorage) {
      this.lang=localStorage.getItem("lang");
      this.langSelect.next(this.lang)
    }
  }
  getlang(){
    this.getselectedLanguage();
    return this.langSelect.asObservable()
  }
}
