import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(public matDialog:MatDialog,
    public dialog:MatDialogRef<ConfirmationComponent>) { }

  ngOnInit(): void {
  }
  close(){
    this.dialog.close()
  }
  confirm(){
    this.matDialog.closeAll()
  }

}
