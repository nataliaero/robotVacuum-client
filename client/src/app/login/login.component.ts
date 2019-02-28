import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from '../shared/User';
import { ApiClientService } from '../api-client.service';

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
              private apiClientService: ApiClientService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close();
  }

}
