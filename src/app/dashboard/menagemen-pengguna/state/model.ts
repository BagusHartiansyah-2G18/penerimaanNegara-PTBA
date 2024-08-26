import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface Mpengguna {
  username: string;
  kdProv: string;
  kdKab: string;
  kdKec: string;
  kdUser: string;
  kdRA: string;
  nama: string;
  pass: string;
  xkdProv:string;
  xkdKab:string;
} 
 
// 
@Injectable({
  providedIn: 'root',
})
export class Epengguna { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  _pengguna( x:Mpengguna){
    return this._httpClient
      .post<Mpengguna[]>(`${Mbase.url("auth/setuser")}`,{
        kdProv:x.kdProv,
        kdKab:x.kdKab,
        kdKec:'0',

        kdUser:x.kdUser,
        kdRA:x.kdRA,
        nama:x.nama,
        username:x.username,
        pass:x.pass,
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  } 
  updPengguna( x:Mpengguna){
    const user1 = Mbase.checkLevel();
    return this._httpClient
      .post<Mpengguna[]>(`${Mbase.url("auth/updPengguna")}`,{
        kdProv:x.kdProv,
        kdKab:x.kdKab,
        kdKec:'0',

        kdUser:x.kdUser,
        kdRA:x.kdRA,
        nama:x.nama,
        username:x.username,
        pass:x.pass,
        xkdProv:x.xkdProv,
        xkdKab:x.xkdKab,
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  delPengguna( x:Mpengguna){
    return this._httpClient
      .post<Mpengguna[]>(`${Mbase.url("auth/delPengguna")}`,{ 
        kdUser:x.kdUser, 
        kdProv:x.kdProv,
        kdKab:x.kdKab,
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  __pengguna(){ 
    return this._httpClient
    .get<Mpengguna[]>(`${Mbase.url("auth/getuser")}` ) 
    .pipe(
      map(v =>{     
        return v; 
      }) 
    )
    
  } 

  
}
