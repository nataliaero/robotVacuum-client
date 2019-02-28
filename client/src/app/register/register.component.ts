import { Component, OnInit } from '@angular/core';

import { NewUser } from '../shared/NewUser';
import { ApiClientService } from '../api-client.service';

import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormControl('');
  user: NewUser = {
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  };

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
              private apiClientService: ApiClientService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close();
  }

  closeForm() {
    this.dialogRef.close();
  }

}
