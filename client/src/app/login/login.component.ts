import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/User';
import { ApiClientService } from '../api-client.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormControl('');
  user: User = {
    username: '',
    password: ''
  };

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private apiClientService: ApiClientService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close();
  }

  register() {
    this.dialogRef.close();
  }

  openForm(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.width = '50rem';
    dialogConfig.height = '60rem';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

}
