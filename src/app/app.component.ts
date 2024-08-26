import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Elogin } from './login/state/model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as Mbase from "../app/utils/support"; 



@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, 
    ReactiveFormsModule, FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'penerimaanNegara';
  dashboard = 0;
  url:string='';
  user1:boolean=false;

  constructor(private readonly ex: Elogin, private router :Router){

  }
  ngOnInit(): void {   
    if (this.ex.isLoggedIn()) { 
      this.dashboard = 1; 
      this.url=String(window.location.pathname).substring(1); 
      if(this.url==''){
        this.router.navigateByUrl("/dash");
      }
      
    }else{ 
      this.router.navigateByUrl("/");
    }  
    this.user1=Mbase.checkLevel();
  }

  clk_logout(){
    localStorage.removeItem('token');
    window.location.href="/";
  }
}
