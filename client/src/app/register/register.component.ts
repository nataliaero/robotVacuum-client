import { Component, OnInit } from '@angular/core';

import { NewUser } from '../shared/NewUser';
import { ApiClientService } from '../api-client.service';
import { AuthService } from '../auth.service';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
  });

  user: NewUser = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    admin: false
  };

  registrationSuccess: boolean;
  messageRegister: string;
  showMessage: boolean;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
              private apiClientService: ApiClientService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.apiClientService.registerUser(this.registrationForm.value)
      .subscribe(res => {
        if (res.err) {
          this.registrationSuccess = false;
          this.messageRegister = res.err.message;
        } else {
          this.registrationSuccess = true;
          this.messageRegister = res.status;
          this.messageRegister += ' Please use your username/password to login.';
          setTimeout(() => { this.dialogRef.close(); }, 3000);
        }
        this.showMessage = true;
      });
  }

  closeForm() {
    this.dialogRef.close();
  }

}
