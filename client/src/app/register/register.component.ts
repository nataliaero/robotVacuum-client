import { Component, OnInit } from '@angular/core';

import { NewUser } from '../shared/NewUser';
import { ApiClientService } from '../api-client.service';

import { FormControl, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
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
    confirmPassword: new FormControl('', Validators.required),
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
  typePassword: string;
  stylePassword: string;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
              private apiClientService: ApiClientService) { }

  ngOnInit() {
    this.typePassword = 'password';
    this.stylePassword = 'input-password-style';
    this.registrationForm.setValidators(this.comparePassword());
  }

  onSubmit() {
    this.user.username  = this.registrationForm.value.username;
    this.user.password  = this.registrationForm.value.password;
    this.user.firstname = this.registrationForm.value.firstname;
    this.user.lastname  = this.registrationForm.value.lastname;

    this.apiClientService.registerUser(this.user)
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

  showPassword() {
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
      this.stylePassword = 'input-style';
    } else {
      this.typePassword = 'password';
      this.stylePassword = 'input-password-style';
    }
  }

  comparePassword(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      /* tslint:disable:no-string-literal */
      const password1 = group.controls['password'];
      const password2 = group.controls['confirmPassword'];
      /* tslint:enable:no-string-literal */
      if (password1.value !== password2.value) {
        password2.setErrors({notEquivalent: true});
      } else {
        password2.setErrors(null);
      }
      return;
    };
  }

}
