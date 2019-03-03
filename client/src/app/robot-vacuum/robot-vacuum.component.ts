import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Robot } from '../shared/Robot';
import { Comment } from '../shared/Comment';
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
  message: Comment = {_id: '', comment: '', date: '', name: '', author: ''};
  reply: Comment = {_id: '', comment: '', date: '', name: '', author: ''};
  username: string = undefined;
  subscription: Subscription;
  messageSent: string;
  replySent: string;

  comments: Comment[];

  replayComment: boolean[];
  showReplyComment: boolean[];

  commentsForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  commentsFormReply = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  constructor(private apiClientService: ApiClientService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    this.id = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.getOneRobot(this.id);
    this.getComments(this.id);
    this.subscription = this.authService.getUsername()
      .subscribe(name => {
        this.username = name;
      });
  }

  getComments(id: number): void {
    this.apiClientService.getComments(id)
    .subscribe(comments => {
      this.comments = comments;
      this.replayComment = [];
      for (let index = 0; index < comments.length; index++) {
        this.replayComment[index] = false;
      }
      this.showReplyComment = [];
      for (let index = 0; index < comments.length; index++) {
        this.showReplyComment[index] = false;
      }
    });
  }

  getOneRobot(id: number): void {
    this.apiClientService.getOneRobot(id)
    .subscribe(robot => {
      return this.robot = robot;
    });
  }

  onKey() {
    this.messageSent = '';
  }

  onClickReply(index: number) {
    this.commentsFormReply.reset();
    this.replayComment[index] = !this.replayComment[index];
    for (const i in this.replayComment) {
      if (i !== index.toString()) { this.replayComment[i] = false; }
    }
  }

  showReplies(index: number) {
    this.showReplyComment[index] = !this.showReplyComment[index];
  }

  onSubmit() {
    this.message.comment = this.commentsForm.value.comment;
    if (this.username) {
      this.message.name = this.username;
    } else {
      this.message.name = 'Anonymous';
    }
    this.apiClientService.postComment(this.id, this.message)
      .subscribe( res => {
        this.getComments(this.id);
      });
    this.commentsForm.reset();
    this.getComments(this.id);
    this.messageSent = 'Your message is posted successfully!';
  }

  onSubmitReply(i: number) {
    this.reply.comment = this.commentsFormReply.value.comment;
    if (this.username) {
      this.reply.name = this.username;
    } else {
      this.reply.name = 'Anonymous';
    }
    const idComment = this.comments[i]._id;

    this.apiClientService.replyComment(idComment, this.reply)
      .subscribe( res => {
        this.getComments(this.id);
      });
    this.commentsFormReply.reset();
    this.getComments(this.id);
    this.replySent = 'Your message is posted successfully!';

  }

}
