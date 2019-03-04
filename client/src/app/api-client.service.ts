import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';

import { Robot } from './shared/Robot';
import { Comment } from './shared/Comment';
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

  registerUser(newUser: NewUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/users/register`, newUser, httpOptions);
  }

  // get comments based on id of one robot vacuum
  getComments(id: number): Observable<Comment[]> {
    const url = this.apiUrl + `/robots/robot/${id}/comments`;
    return this.http.get<Comment[]>(url);
  }

  // post one comment based on id of one robot vacuum
  postComment(id: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl + `/robots/robot/${id}/comments`, comment, httpOptions);
  }

  // post one comment based on id of one robot vacuum
  replyComment(idComment: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl + `/comments/${idComment}/reply`, comment, httpOptions);
  }

  // delete one comment based on id of one robot vacuum
  deleteComment(idComment: string): Observable<Comment> {
    return this.http.delete<Comment>(this.apiUrl + `/comments/${idComment}/delete`, httpOptions);
  }

}
