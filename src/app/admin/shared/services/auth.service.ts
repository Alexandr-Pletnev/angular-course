import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {fbAuthResponse, User} from "../../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: "root"})
export class AuthService {

  public errors$ = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if(new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public login(user: User) : Observable<any>{
    user.returnSecureToken = true;
    return this.http.post<fbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.errorHandle.bind(this)),
      );
  }

  public logout(){
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return  !!this.token;
  }

  private errorHandle(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
        case 'INVALID_EMAIL':
          this.errors$.next('Некорректный email');
          break;
        case 'INVALID_PASSWORD':
          this.errors$.next('Неверный пароль');
          break;
        case 'EMAIL_NOT_FOUND':
          this.errors$.next('email не найден');
          break;
        default:
          this.errors$.next(message);
          break;
    }

    return throwError(() => error);
  }

  private  setToken(response: fbAuthResponse) : void {
    // console.log(response);
    const expDate = new Date(Date.now() + +response.expiresIn * 1000);
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }
}
