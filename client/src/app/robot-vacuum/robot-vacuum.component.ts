import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Robot } from '../shared/Robot';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-robot-vacuum',
  templateUrl: './robot-vacuum.component.html',
  styleUrls: ['./robot-vacuum.component.css']
})
export class RobotVacuumComponent implements OnInit {

  robot: Robot;

  constructor(private apiClientService: ApiClientService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    /* tslint:disable:no-string-literal */
    const id = this.route.snapshot.params['id'];
    /* tslint:enable:no-string-literal */
    this.getOneRobot(id);
  }

  getOneRobot(id: number): void {
    this.apiClientService.getOneRobot(id)
    .subscribe(robot => {
      return this.robot = robot;
    });
  }

}
