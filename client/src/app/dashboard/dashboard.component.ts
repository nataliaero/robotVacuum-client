import { Component, OnInit } from '@angular/core';

import { Robot } from '../shared/Robot';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  robots: Robot[];

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit() {
    this.getRobots();
  }

  getRobots(): void {
    this.apiClientService.getRobots()
    .subscribe(robots => this.robots = robots);
  }

}
