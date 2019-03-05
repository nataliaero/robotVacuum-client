import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../auth.service';
import { ApiClientService } from '../api-client.service';

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

  loginSuccess = true; // Initially at true so that error is not displayed

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private apiClientService: ApiClientService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.logIn(this.loginForm.value)
    .subscribe(res => {
      if (res.success) {
        this.loginSuccess = true;
        this.dialogRef.close();
      } else {
        this.loginSuccess = false;
      }
      this.apiClientService.setLoginSucess(this.loginSuccess);
    });
  }

  onKey() {
    this.loginSuccess = true;
  }

  openForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50rem';
    dialogConfig.height = '65rem';
    this.loginSuccess = true;
    this.dialog.open(RegisterComponent, dialogConfig);
    this.dialogRef.close(); // closing login form
  }

}
