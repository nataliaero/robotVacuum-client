import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/User';
import { AuthService } from '../auth.service';
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
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('***this.loginForm.value ', this.loginForm.value);
    this.authService.logIn(this.loginForm.value)
    .subscribe(res => {
      console.log('res ', res);
      console.log('res.sucess ', res.success);
      if (res.success) {
        console.log('***')
        this.dialogRef.close();
      }
    }, error => {
      console.log('error ', error);
    });

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
