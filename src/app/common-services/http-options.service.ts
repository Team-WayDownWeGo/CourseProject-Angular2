import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpOptionsService {
  public getRequestOptions(sendData: boolean, token?: string): RequestOptions {
    let headersObj = {};

    if (sendData) {
      headersObj['Content-Type'] = 'application/json';
    }

    if (token) {
      headersObj['Authorization'] = token;
    }

    let headers: Headers = new Headers(headersObj);
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return options;
  }
}
