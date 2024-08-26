import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface MKab { 
  kdProv: string;
  kdKab: string; 
  nmKab: string; 
} 
 
// 
@Injectable({
  providedIn: 'root',
})
export class Epengguna { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  _kab( x:MKab){
    return this._httpClient
      .post<MKab[]>(`${Mbase.url("auth/setuser")}`,{
        kdProv:x.kdProv,
        kdKab:x.kdKab, 
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  } 
  updKab( x:MKab){
    return this._httpClient
      .post<MKab[]>(`${Mbase.url("auth/updPengguna")}`,{
        kdProv:x.kdProv,
        kdKab:x.kdKab,
        kdKec:'0', 
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  delKab( x:MKab){
    return this._httpClient
      .post<MKab[]>(`${Mbase.url("auth/delPengguna")}`,{ 
        
        kdProv:x.kdProv,
        kdKab:x.kdKab,
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  __kab(){
    const token =Mbase.__storage("token");
    const {kdRA} = JSON.parse(atob(String(token).split('.')[1])); 
    return this._httpClient
    .get<MKab[]>(`${Mbase.url("auth/getuser")}` ) 
    .pipe(
      map(v =>{     
        return v; 
      }) 
    )
    
  } 
}
