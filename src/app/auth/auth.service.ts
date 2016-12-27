import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpOptionsService } from '../common-services';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AppSettings } from '../../common/AppSettings';

const CONNECTION_STRING = AppSettings.CONNECTION_STRING;
const REGISTER_URL: string = `${CONNECTION_STRING}/auth/register`;
const LOGIN_URL: string = `${CONNECTION_STRING}/auth/login`;
const LOGOUT_URL: string = `${CONNECTION_STRING}/auth/logout`;
const VERIFY_LOGIN_URL: string = `${CONNECTION_STRING}/auth/verify`;

@Injectable()
export class AuthService {
    private _http: Http;
    private _httpOptionsService: HttpOptionsService;

    constructor(http: Http, httpOptionsService: HttpOptionsService) {
        this._http = http;
        this._httpOptionsService = httpOptionsService;
    }

    public loginUser(data: Object): Observable<any> {
        let userToLogin: string = JSON.stringify(data);
        let options: RequestOptions = this._httpOptionsService.getRequestOptions(true);
        return this._http.post(LOGIN_URL, userToLogin, options)
            .map((res: Response) => res.json());
    }

    public isLoggedIn(): Observable<boolean> | boolean {
        let userDataString: string = localStorage.getItem('user');
        if (!userDataString) {
            return false;
        }

        let token: string = JSON.parse(userDataString).result.token;
        let options = this._httpOptionsService.getRequestOptions(true, token);

        return this._http
            .post(VERIFY_LOGIN_URL, '', options)
            .map((response: Response) => {
                let result = JSON.parse(response.text());
                if (result.success) {
                    return true;
                }

                return false;
            });
    }

    public registerUser(data: Object): Observable<any> {
        let userToCreate: string = JSON.stringify(data);
        let options: RequestOptions = this._httpOptionsService.getRequestOptions(true);
        return this._http
            .post(REGISTER_URL, userToCreate, options)
            .map((res: Response) => res.json());
    }

}