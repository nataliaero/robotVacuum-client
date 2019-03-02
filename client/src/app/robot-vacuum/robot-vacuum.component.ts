import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Robot, Comment } from '../shared/Robot';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-robot-vacuum',
  templateUrl: './robot-vacuum.component.html',
  styleUrls: ['./robot-vacuum.component.css']
})
export class RobotVacuumComponent implements OnInit {

  robot: Robot;
  id: number;
  message: Comment = {comment: '', date: 0};

  commentsForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  constructor(private apiClientService: ApiClientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    this.id = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.getOneRobot(this.id);
  }

  getOneRobot(id: number): void {
    this.apiClientService.getOneRobot(id)
    .subscribe(robot => {
      return this.robot = robot;
    });
  }

  onSubmit() {
    console.log('this.commentsForm.value ', this.commentsForm.value);
    this.message.comment = this.commentsForm.value.comment;
    this.message.date = Date.now();

    // this.apiClientService.postComment(this.id, this.message);
  }

}
