import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../utils/support" 


export interface Mlogin {
    username: string;
    kdProv: string;
    kdKab: string;
    kdKec: string;
    kdUser: string;
    kdRA: string;
    nama: string;
    pass: string;
} 
 

@Injectable({
  providedIn: 'root',
})
export class Elogin { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  auth(username: string, password: string) {
    return this._httpClient
      .post<Mlogin[]>(`${Mbase.url("auth/login")}`,{username,password}) 
      .pipe(map(v =>{  
        return v; 
      })); 
  }
  
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean { 
    const token = this.getToken();
    if(token==null){
      return false;
    } 
    return this.isTokenExpired(String(token));
    // return !!token; // Mengembalikan true jika token ada
  }
  private isTokenExpired(token:string):boolean {  
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if(expiry * 1000 > Date.now()){   
      return true;
    } 
    localStorage.removeItem('token');
    return false;
  }
}
