import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

import { Robot } from './shared/Robot';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private apiUrl = 'http://localhost:3000';

  searchVal$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  getRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.apiUrl + '/robots');
  }

  searchRobot(name: string): Observable<Robot[]> {
    const url = this.apiUrl + `/search?q=${name}`;
    return this.http.get<Robot[]>(url);
  }

  setSearchVal(stringVal: string) {
    this.searchVal$.next(stringVal);
  }

  getSearchVal() {
    return this.searchVal$;
  }


}
