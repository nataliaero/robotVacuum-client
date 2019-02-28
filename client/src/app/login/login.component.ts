import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
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

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

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
    // console.log('***this.loginForm.value ', this.loginForm.value)
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
