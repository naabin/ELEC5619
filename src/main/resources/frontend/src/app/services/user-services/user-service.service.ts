import { Injectable } from '@angular/core';
import { url } from '../../../util/remoteUrl';
import { BehaviorSubject, Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { User } from 'src/app/entities/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private remoteUrl = url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("token") || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  sendToken(email: string){
    return this.http.post<any>(`${this.remoteUrl}api/user/sendtoken`,
    {}, {params: {email: email}});
  }

  validateToken(token: string){
    return this.http.post<any>(`${this.remoteUrl}api/user/validatetoken`, {}, {params: {resetToken: token}});
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<User>('/api/user', JSON.stringify(user), this.httpOptions);
  }

  registerRenter(user: User): Observable<any> {
    return this.http.post<User>('/api/user/renter', JSON.stringify(user), this.httpOptions);
  }

  authenticateUser(username: string, password: string) {
    return this.http.post<User>(this.remoteUrl + '/api/auth/authenticate',
      JSON.stringify({username, password}), this.httpOptions)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user)
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('userId', JSON.stringify(user.id));
        })
      )
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  public get currentUserValue(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }

  checkValidJWT(){
    return this.http.post<{tokenExpired: boolean}>(`${this.remoteUrl}api/auth/validtoken`, {})
      .pipe(
        tap(
          (res) => {console.log(res)},
          () => {
            // this.notificationService.addError('User session timed out.');
          })
      );
  }

  emailExists(email: string) {
    return this.http.post<{available: boolean}>(`${this.remoteUrl}/api/user/unique-email`, {}, {params: {email}});
  }

  usernameExists(username: string) {
    return this.http.post<{available: boolean}>(`${this.remoteUrl}/api/user/unique-user`, {}, {params: {username}});
  }
}
