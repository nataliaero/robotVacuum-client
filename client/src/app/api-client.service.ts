import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';

import { Robot } from './shared/Robot';
import { NewUser } from './shared/NewUser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  getOneRobot(id: number): Observable<Robot> {
    const url = this.apiUrl + `/robots/robot/${id}`;
    return this.http.get<Robot>(url);
  }

  getTop10Robots(): Observable<Robot[]> {
    const url = this.apiUrl + `/robots/top10`;
    return this.http.get<Robot[]>(url);
  }

  searchRobot(name: string): Observable<Robot[]> {
    const url = this.apiUrl + `/robots/search/${name}`;
    return this.http.get<Robot[]>(url);
  }

  setSearchVal(stringVal: string) {
    this.searchVal$.next(stringVal);
  }

  getSearchVal() {
    return this.searchVal$;
  }

  registerUser(newUser: NewUser) {
    this.http.post<NewUser>(this.apiUrl + `/users/register`, newUser, httpOptions).subscribe();
  }



}
