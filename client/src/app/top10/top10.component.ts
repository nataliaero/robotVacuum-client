import { Component, OnInit } from '@angular/core';

import { Robot } from '../shared/Robot';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {

  robots: Robot[];

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit() {
    this.getTop10Robots();
  }

  getTop10Robots(): void {
    this.apiClientService.getTop10Robots()
    .subscribe(robots => {
      return this.robots = robots;
    });
  }



}
