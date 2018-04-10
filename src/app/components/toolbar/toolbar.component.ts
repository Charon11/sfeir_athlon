import { Component, OnInit } from '@angular/core';
import { RulesDialogComponent } from '../rules-dialog/rules-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(RulesDialogComponent, {
      width: '90%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
