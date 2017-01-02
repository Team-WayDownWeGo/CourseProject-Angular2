import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HttpOptionsService } from './../common-services/http-options.service';
import { AppSettings } from './../../common/AppSettings';

const CONNECTION_STRING: string = AppSettings.CONNECTION_STRING;
const USER_URL: String = `${CONNECTION_STRING}/users`;
const SINGLE_USER_URL: String = `${CONNECTION_STRING}`;


@Injectable()
export class UserService {
  private _http: Http;
  private _httpOptionsService: HttpOptionsService;
  private _isLogged: boolean;
  private _isLoggedSubject: Subject<boolean>;
  private _isUserUpdated: boolean;
  private _isUserUpdatedSubject: Subject<boolean>;

  constructor(http: Http, httpOptionsService: HttpOptionsService) {
    this._http = http;
    this._httpOptionsService = httpOptionsService;
    this._isLoggedSubject = new Subject<boolean>();
    this._isUserUpdatedSubject = new Subject<boolean>();
    this._isUserUpdated = false;
  }

  public setIsUserLoggedIn(): void {
    this._isLogged = !!localStorage.getItem('user');
    this._isLoggedSubject.next(this._isLogged);
  }

  public getUserLoggedIn(): Observable<boolean> {
    return this._isLoggedSubject.asObservable();
  }

  public setIsUserUpdated(): void {
    this._isUserUpdated = true;
    this._isUserUpdatedSubject.next(this._isUserUpdated);
    this._isUserUpdated = false;
  }

  public getIsUserUpdated(): Observable<boolean> {
    return this._isUserUpdatedSubject.asObservable();
  }

  public getUserData(username: string): Observable<any> {
    let url = `${SINGLE_USER_URL}/user/${username}`;
    return this._http.get(url).map((response: Response) => response.json());
  }

  public updateUserData(userId: string, userData: Object): Observable<any> {
    let url = `${USER_URL}/${userId}/edit`;
    let requestOptions = this._httpOptionsService.getRequestOptions(true);
    let data = JSON.stringify(userData);
    return this._http.post(url, data, requestOptions).map((response: Response) => response.json());
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  public sendMessageToUser(to: String, from: String, message: any): Observable<any> {
    let apiUrl = `${SINGLE_USER_URL}/user/message/${to}`;
    let headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this._http.post(
      apiUrl,
      JSON.stringify({ message, user: from }),
      { headers }
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  public updateMessageToViewed(messageId: string): Observable<any> {
    let url = `${SINGLE_USER_URL}/user/message/change-status/${messageId}`;
    let requestOptions = this._httpOptionsService.getRequestOptions(true);
    let data = JSON.stringify({});
    return this._http.post(url, data, requestOptions).map((response: Response) => response.json());
  }
}
