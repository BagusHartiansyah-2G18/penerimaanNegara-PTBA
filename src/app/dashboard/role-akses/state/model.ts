import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import * as Mbase from "../../../utils/support" 


export interface Mrole {
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
export class Erole { // exec yang berhubungan dengan login
  constructor(private readonly _httpClient: HttpClient) {}

  __role(){
    return this._httpClient
      .get<Mrole[]>(`${Mbase.url("role")}`) 
      .pipe(map(v =>{     
        return v; 
      })); 
  } 
}
