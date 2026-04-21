import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';

const material=[
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[material]
})
export class MaterialModule { }
