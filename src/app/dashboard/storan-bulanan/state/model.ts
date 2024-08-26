import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface Msetoran { 
  kdSetoran: string;
  kdSS: string; 
  kdUser: string; 

  dateS: string;
  dateE: string; 
  totol: string; 

  xkdSetoran: string; 
} 
 
// 
@Injectable({
  providedIn: 'root',
})
export class Esetoran { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  __kategoriSumber(){
    return this._httpClient
      .get<Msetoran[]>(`${Mbase.url("auth/getKategori")}`) 
      .pipe(
        map(v =>{     
          return v; 
        }) 
      )
  }
  _setor( x:Msetoran){
    const token =Mbase.__storage("token");
    const {kdUser,kdProv,kdRA,kdKab} = JSON.parse(atob(String(token).split('.')[1])); 
    x.kdUser =String(kdUser+"|"+kdProv+"|"+kdKab+"|"+kdRA);
    return this._httpClient
      .post<Msetoran[]>(`${Mbase.url("auth/setsetor")}`,{...x}) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  } 
  updsetor( x:Msetoran){
    return this._httpClient
      .post<Msetoran[]>(`${Mbase.url("auth/updsetor")}`,{...x}) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  delsetor( x:Msetoran){
    return this._httpClient
      .post<Msetoran[]>(`${Mbase.url("auth/delsetor")}`,{  
        kdSetoran:x.kdSetoran
      }) 
      .pipe(
          map(v =>{     
            return v; 
          }) 
      )
  }
  __setor(){ 
    return this._httpClient
    .get<Msetoran[]>(`${Mbase.url("auth/getsetor")}` ) 
    .pipe(
      map(v =>{     
        return v; 
      }) 
    )
    
  } 
}
