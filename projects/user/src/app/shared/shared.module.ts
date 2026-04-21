import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './components/theme/theme.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports:[
    ThemeComponent
  ]
})
export class SharedModule { }
