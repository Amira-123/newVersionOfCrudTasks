import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeColorComponent } from './components/theme-color/theme-color.component';
import { TranslateComponent } from './components/translate/translate.component';



@NgModule({
  declarations: [
    ThemeColorComponent,
    TranslateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports:[
    TranslateModule,
    ThemeColorComponent,
    TranslateComponent
  ]
})
export class SharedModule { }
