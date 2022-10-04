import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  
  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    return JSON.parse(localStorage.getItem('roles') as string);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') as string;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    if(this.getToken() != null && this.getRoles() != null){
      return true;
    }
    return false;
    //return true if getRoles is not null and getToken is not null.
    //return this.getRoles() && this.getToken();
  }

}
