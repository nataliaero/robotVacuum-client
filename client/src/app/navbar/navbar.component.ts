import { Component, OnInit } from '@angular/core';

import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openForm(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '50rem';
    dialogConfig.height = '40rem';
    this.dialog.open(LoginComponent, dialogConfig);
  }

}
