import { SharedService } from '../../services/shared.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  @Output() selectedlang:EventEmitter <string> =new EventEmitter
  lang:any='en'
  constructor(private sharedService:SharedService) {

   }

  ngOnInit(): void {
    // if('lang' in localStorage){
    //   this.lang=localStorage.getItem('lang')
    //  }
    //  else{
    //    this.lang=localStorage.setItem('lang','en')
    //  }
  }
  changeLanguage(event:any){
    let value=event.target.innerText
    console.log(event.target.innerText)

    // if(this.lang=="en"){
    //   localStorage.setItem("lang","ar")
    // }
    // else{
    //   localStorage.setItem("lang","en")
    // }
    // window.location.reload()
    if(this.lang=="en"){
      this.lang='ar'
    }
    else{
      this.lang='en'
    }

    this.selectedlang.emit(value);
    this.sharedService.getselectedLanguage()

  }

}
