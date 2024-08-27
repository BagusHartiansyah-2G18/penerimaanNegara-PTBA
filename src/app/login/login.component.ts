import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 
import { FormsModule } from '@angular/forms';

//awal
import { PersonStore } from './state/action'; 
import { Elogin } from './state/model';

//ajib
import { Ekab } from '../dashboard/kebupaten/state/model';
import { STkab } from '../dashboard/kebupaten/state/action';

import {FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Route, Router } from "@angular/router";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [PersonStore, STkab],
})
export class LoginComponent implements OnInit {
  title = 'Penerimaan Negara'; 
  search = new FormControl('');
  username = new FormControl('');
  pass = new FormControl(''); 
  dkab: any;

  constructor(
    private readonly _personStore: PersonStore,
    private readonly ex: Elogin, 

    private readonly Ekab:Ekab,
    private readonly STkab:STkab,

    private toast : ToastrService,
    private router: Router
  ) { 
  }
 
  


  ngOnInit(): void { 
    if (this.ex.isLoggedIn()) {
      // this.router.navigateByUrl('/dash');
    } 
  } 

  login() { 
    if ( this.username &&  this.pass) {
      if(String(this.username.value).length < 10 ){
        this.toast.error('Username sebanyak 10 digit', 'Error'); 
      } 
      this.ex.auth(String(this.username.value),String(this.pass.value)).subscribe({
        next: (v:any) => {  
          if(v.access_token=='0'){
            this.toast.error('Usernama dan password, Tidak ditemukan', 'Error'); 
          }else{
            
            this.ex.storeToken(JSON.stringify(v));
            window.location.href ="/dash";
          }
          // this.router.navigateByUrl("/dash");
          // 
        },
      }); 
  }else{
    this.toast.error('Mohon Entri Usernama dan password !!!', 'Error'); 
  }

  }
}
