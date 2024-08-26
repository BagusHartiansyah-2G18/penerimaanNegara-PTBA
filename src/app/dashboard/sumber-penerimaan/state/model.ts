import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface Msumber { 
  kdKS: string;
  kdSS: string; 
  nmSS: string; 

  kabP: string;
  provP: string; 
  pusatP: string; 

  xkdKS: string;
  xkdSS: string; 
} 
 
// 
@Injectable({
  providedIn: 'root',
})
export class EsubSumber { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  __kategoriSumber(){
    return this._httpClient
      .get<Msumber[]>(`${Mbase.url("auth/getKategori")}`) 
      .pipe(
        map(v =>{     
          return v; 
        }) 
      )
  }
  _subSumber( x:Msumber){
    return this._httpClient
      .post<Msumber[]>(`${Mbase.url("auth/setsubSumber")}`,{...x}) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  } 
  updsubSumber( x:Msumber){
    return this._httpClient
      .post<Msumber[]>(`${Mbase.url("auth/updsubSumber")}`,{...x}) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  delsubSumber( x:Msumber){
    return this._httpClient
      .post<Msumber[]>(`${Mbase.url("auth/delsubSumber")}`,{  
        kdKS:x.xkdKS,
        kdSS:x.xkdSS,
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  __subSumber(){ 
    return this._httpClient
    .get<Msumber[]>(`${Mbase.url("auth/getSubSumber")}` ) 
    .pipe(
      map(v =>{     
        return v; 
      }) 
    )
    
  } 
}
