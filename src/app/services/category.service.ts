import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';


@Injectable()
export class ForumService {

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  api_url: string = 'http://localhost:3001/category';

  constructor(private http: Http) {}

  private getJson(response: Response) {
    return response.json();
  }

   private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText)
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  createCategory(category): Observable<any> {
   return this.http.post(
      `${this.api_url}`,
      JSON.stringify(category),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  getAllCategories(): Observable<any> {
     return this.http.get(
      `${this.api_url}`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }
}   
