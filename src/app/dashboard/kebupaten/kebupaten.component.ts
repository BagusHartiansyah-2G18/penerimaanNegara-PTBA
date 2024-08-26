import { Component, OnInit } from '@angular/core';
import { Ekab, Mkab, xevent } from '../kebupaten/state/model';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
 
@Component({
  selector: 'app-kebupaten',
  standalone: true,
  imports:  [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './kebupaten.component.html',
  styleUrl: './kebupaten.component.css'
})
export class KebupatenComponent implements OnInit {
  constructor( 
    private readonly Ekab:Ekab,private toast : ToastrService 
  ){

  }
  
  dkab: any;
  lkab: any; //list yang ditampilkan
  
  dprov: any;
  kdProv:string='';
  
  search = new FormControl('');
  nmKab = new FormControl('');

  dform:any={
    on:true,
    idt:-1, //index informasi
    ins:1
  }
 
  ngOnInit(): void {  
    this.Ekab.getAllData().subscribe({
      next: (v) => {  
        this.setKab(v); 
      },
    });   

    this.Ekab.__prov().subscribe({
      next: (v) => {   
        this.dprov=v; 
      },
    });  
  } 

  setKab(xdt:any){
    this.dkab=[...xdt].map((k,i)=>{
      return {...k,i}
    });
    this.lkab=this.dkab.slice(0,15)
  }

  searchList(){
    const e= String(this.search.value);
    // const e=String((val.target as HTMLSelectElement).value)
    let i=0;
    this.lkab = [...this.dkab].filter((item)=>{  
      if(i<15){
        if (e === "") {
            i++;
            return item;
        } else if (
          String(item.nmKab).toLowerCase().includes(e.toLowerCase()) || String(item.nmProv).toLowerCase().includes(e.toLowerCase())
        ) {
          i++;
          return item;
          
        } 
      }
    });
  }

  oncProvinsi(val:Event){
    this.kdProv=String((val.target as HTMLSelectElement).value);
  }

  checkForm():boolean{
    if (String(this.nmKab.value)!='') {
      try { 
        if(this.kdProv==''){
          throw 'Mohon unttuk memilih Provinsi';
        }  
      } catch (error) {  
        this.toast.error(String(error), 'Error!');
      } 
      return true
    }else{
      this.toast.error('Mohon Entri Nama Kabupaten / Kota !!!', 'Informasi'); 
    } 
    return false;
  }
  addForm(){
    if(this.checkForm()){ 
      const model =<Mkab>{};
      model.kdProv=this.kdProv; 
      model.nmKab=String(this.nmKab.value);
      this.Ekab._kab(model).subscribe({
          next: (v) => {  
            this.setKab(v);
            // this.dkab = [...this.dkab,{...model,nmProv:[...this.dprov].filter(v=>v.kdProv == model.kdProv)[0].nmProv}] ;
            this.reset(); 
          },
      });   
    } 
  }
  updForm(i:number){
    const { nmKab, kdKab  } = this.lkab[i];
    this.nmKab = new FormControl(nmKab); 
    this.kdProv = this.lkab[i].kdProv;  
    
    this.dform={
      ...this.dform,
      on:1,
      ins:0,
      idt:this.lkab[i].i
    } 
  }
  updFormed(){
    if(this.checkForm()){ 
      const model =<Mkab>{};
      model.kdProv=this.kdProv;
      model.nmKab=String(this.nmKab.value);
      model.xkdKab=this.dkab[this.dform.idt].kdKab;
      model.xkdProv=this.dkab[this.dform.idt].kdProv;
      this.Ekab.updkab(model).subscribe({
          next: (v) => {  
            this.setKab(v);
            // this.dkab[this.dform.idt]={...model, nmProv:this.dkab[this.dform.idt].nmProv, i:this.dform.idt};
            this.reset();  
            // this.searchList();
            this.changeForm();
          },
      });   
    } 
  }
  delForm(i:number){
    const model =<Mkab>{}; 
    model.xkdKab=this.lkab[i].kdKab;
    model.xkdProv=this.lkab[i].kdProv;
    this.Ekab.delkab(model).subscribe({
        next: (v) => {  
          this.dkab = [...this.dkab].filter((v1,i1)=>i1!=this.lkab[i].i);
          this.reset();  
          this.searchList();
        },
    });   
  }
  reset(){
    this.nmKab=new FormControl(''); 
  }
  changeForm(){ 
    this.dform={
      ...this.dform,
      on:1,
      ins:1
    }
    this.nmKab = new FormControl(''); 
  }
}
