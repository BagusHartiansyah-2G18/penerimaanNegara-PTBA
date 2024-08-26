import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface xevent{
  target:any
}

export interface Mkab {
  kdProv: string; 
  kdKab: string; 
  nmKab: string; 
  xkdProv: string; 
  xkdKab: string; 
} 
 
@Injectable({
  providedIn: 'root',
})
export class Ekab { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  getAllData(): Observable<Mkab[]> {
    return this._httpClient
      .get<Mkab[]>(`${Mbase.url("kabupaten")}`) 
      .pipe(map(v =>{     
        return v; 
      })); 
  }
  _kab(data: any): Observable<Mkab[]> {
    return this._httpClient
    .post<Mkab[]>(`${Mbase.url("auth/setkab")}`,data) 
    .pipe(map(v =>{     
      return v; 
    })); 
  }
  updkab(data: any): Observable<Mkab[]> {
    return this._httpClient
    .post<Mkab[]>(`${Mbase.url("auth/updkab")}`,data) 
    .pipe(map(v =>{     
      return v; 
    })); 
  }
  delkab(data: any): Observable<Mkab[]> {
    return this._httpClient
    .post<Mkab[]>(`${Mbase.url("auth/delkab")}`,data) 
    .pipe(map(v =>{     
      return v; 
    })); 
  }
  __prov(): Observable<Mkab[]> {
    return this._httpClient
      .get<Mkab[]>(`${Mbase.url("auth/getProvinsi")}`) 
      .pipe(map(v =>{     
        return v; 
      })); 
  } 
}
