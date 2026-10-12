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
  searchVal: string;

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit() {
    this.getRobots();
  }

  onKey(searchValue: string) {
    this.apiClientService.setSearchVal(searchValue);
    this.apiClientService.getSearchVal().subscribe(data => {
      this.searchVal = data;
      if (this.searchVal) {
        this.searchRobot(this.searchVal);
      } else {
        this.getRobots();
      }
    });
  }

  searchRobot(value: string): void {
    this.apiClientService.searchRobot(value)
    .subscribe(robots => {
      this.robots = robots;
    });
  }


  getRobots(): void {
    this.apiClientService.getRobots()
    .subscribe(robots => this.robots = robots);
  }

}
