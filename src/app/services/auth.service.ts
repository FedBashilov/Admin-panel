import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentAdminSubject = new BehaviorSubject<string>( '' );
  currentAdmin = this.currentAdminSubject.asObservable();

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient) {
    this.currentAdminSubject.next( this.getJWT() );
  }


  getJWT(){
    return localStorage.getItem("jwt");
  }

  setJWT(jwt: string){
    localStorage.setItem("jwt", jwt);
  }


  login(login, password): Observable<any>{
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/API.php/login-admin`, {data: { login: login, password: password }});
  }

  logout(){
    localStorage.removeItem("jwt");
    this.currentAdminSubject.next( '' );
  }


}
