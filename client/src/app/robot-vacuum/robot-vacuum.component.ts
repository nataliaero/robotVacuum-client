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
  idRobot: number;
  commentAux: Comment;
  message: Comment = {_id: '', comment: '', date: '', name: '', author: '', comments: [this.commentAux]};
  reply: Comment = {_id: '', comment: '', date: '', name: '', author: '', comments: [this.commentAux]};
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
    this.idRobot = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.getOneRobot(this.idRobot);
    this.getComments(this.idRobot);
    this.subscription = this.authService.getUsername()
      .subscribe(name => {
        this.username = name;
      });
  }

  getComments(idRobot: number): void {
    this.apiClientService.getComments(idRobot)
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

  getOneRobot(idRobot: number): void {
    this.apiClientService.getOneRobot(idRobot)
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
    this.apiClientService.postComment(this.idRobot, this.message)
      .subscribe( res => {
        this.getComments(this.idRobot);
      });
    this.commentsForm.reset();
    this.getComments(this.idRobot);
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
        this.getComments(this.idRobot);
      });
    this.commentsFormReply.reset();
    this.getComments(this.idRobot);
    this.replySent = 'Your message is posted successfully!';
  }

  deleteComment(i: number) {
    const idComment = this.comments[i]._id;
    this.apiClientService.deleteComment(idComment, this.idRobot)
      .subscribe(res => {
        this.getComments(this.idRobot);
      });
  }

  deleteSubComment(i: number, j: number) {
    const idComment = this.comments[i].comments[j]._id;
    this.apiClientService.deleteComment(idComment, this.idRobot)
    .subscribe(res => {
      this.getComments(this.idRobot);
    });
  }

}
