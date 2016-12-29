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
  api_url: string = 'http://localhost:3001/forum';

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

  createPost(post): Observable<any> {
   return this.http.post(
      `${this.api_url}/create`,
      JSON.stringify(post),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  addCommentToPost({content, postId}): Observable<any> {
    return this.http.post(
      `${this.api_url}/${postId}/comment`,
      JSON.stringify(content),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  getPost(postId): Observable<any> {
     return this.http.get(
      `${this.api_url}/${postId}`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  likePost(postId): Observable<any> {
    return this.http.put(
      `${this.api_url}/${postId}/like`,
      null,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

   unlikePost(postId): Observable<any> {
    return this.http.put(
      `${this.api_url}/${postId}/unlike`,
      null,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  likeComment({postId, commentId}): Observable<any> {

    console.log(postId);
    console.log(commentId);
    
    return this.http.put(
      `${this.api_url}/${postId}/comment/${commentId}/like`,
      null,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  unLikeComment({postId, commentId}): Observable<any> {
    return this.http.put(
      `${this.api_url}/${postId}/comment/${commentId}/unlike`,
      null,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  getAllPosts(page): Observable<any> {
     return this.http.get(
      `${this.api_url}/${page}`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }
}   
