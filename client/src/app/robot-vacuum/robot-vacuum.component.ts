import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Robot, Comment } from '../shared/Robot';
import { ApiClientService } from '../api-client.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-robot-vacuum',
  templateUrl: './robot-vacuum.component.html',
  styleUrls: ['./robot-vacuum.component.css']
})
export class RobotVacuumComponent implements OnInit {

  robot: Robot;
  id: number;
  message: Comment = {comment: '', date: 0, name: '', author: ''};
  username: string = undefined;
  subscription: Subscription;
  messageSent: string;

  commentsForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    name: new FormControl(''),
  });

  constructor(private apiClientService: ApiClientService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    this.id = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.getOneRobot(this.id);

    this.subscription = this.authService.getUsername()
      .subscribe(name => {
        this.username = name;
      });
  }

  getOneRobot(id: number): void {
    this.apiClientService.getOneRobot(id)
    .subscribe(robot => {
      return this.robot = robot;
    });
  }

  onSubmit() {
    this.message.comment = this.commentsForm.value.comment;
    if (this.username) {
      this.message.name = this.username;
    } else {
      if (this.commentsForm.value.name) {
        this.message.name = this.commentsForm.value.name;
      } else {
        this.message.name = 'anonymous';
      }
    }

    this.message.date = Date.now();
    this.apiClientService.postComment(this.id, this.message);
    this.commentsForm.reset();
  }

}
