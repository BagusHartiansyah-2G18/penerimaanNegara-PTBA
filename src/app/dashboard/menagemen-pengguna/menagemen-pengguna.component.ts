import { Component, OnInit } from '@angular/core';

import { Ekab } from '../kebupaten/state/model';
import { Erole } from '../role-akses/state/model';
import { Epengguna, Mpengguna } from './state/model';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as Mbase from "../../utils/support" 

@Component({
  selector: 'app-menagemen-pengguna',
  standalone: true,
  imports:  [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './menagemen-pengguna.component.html',
  styleUrl: './menagemen-pengguna.component.css'
})
export class MenagemenPenggunaComponent implements OnInit {
  constructor( private readonly Ekab:Ekab,private toast : ToastrService,
    private erole : Erole, private epengguna :Epengguna,
  ){ 
  }

  search = new FormControl('');

  nama = new FormControl('');
  username = new FormControl('');
  pass = new FormControl(''); 
  
  fadd = 1;

  dkab: any;
  public selectedValue: any;
  public searchValue: any;
  public filteredList: any = [];
  
  user1:boolean=false;

  drole: any;
  kdRA:String=''; 

  duser:any;

  dform:any={
    on:true,
    idt:-1, //index informasi
    ins:1
  }
 
  selectValue(i:number) { 
    this.selectedValue = this.filteredList[i];
  }

  getValueRole(kdRA:String){ 
    return [...this.drole].filter((v)=>v)[0].nmRA;
  }

  changeForm(){ 
    this.dform={
      ...this.dform,
      on:1,
      ins:1
    }
    this.nama = new FormControl('');
    this.username = new FormControl('');
    this.pass = new FormControl(''); 
  }
  _informasi(ind:number){ 
    this.dform={
      ...this.dform,
      on:false,
      idt:ind
    }
  }

  _dataUpdate(ind:number){ 
    const { nama, username, pass, kdRA, kdProv, kdKab,  } = this.duser[ind];
    this.nama = new FormControl(nama);
    this.username = new FormControl(username);
    this.pass = new FormControl(pass); 

    this.dform={
      ...this.dform,
      on:1,
      ins:0,
      idt:ind
    } 
    
    this.kdRA=kdRA; 
    
    this.selectedValue = [...this.dkab].filter(v=>v.kdProv == kdProv && v.kdKab==kdKab)[0]; 
  }
  _dataUpdateed(){
    if(this.checkForm()){
      const model =<Mpengguna>{};
      model.kdProv = this.selectedValue.kdProv; 
      model.kdKab = this.selectedValue.kdKab;

      model.nama = String(this.nama.value);
      model.username = String(this.username.value);
      model.pass = String(this.pass.value);
 
      const dawal = [...this.duser][this.dform.idt];  

      if(this.user1){ // true am PPN
        model.kdRA = String(this.kdRA); 
      }else{
        model.kdRA = String(dawal.kdRA); 
      } 
      model.kdUser = String(dawal.kdUser); 
       
      
      this.epengguna.updPengguna(model)?.subscribe({
          next: (v) => {  
            this.duser=[...v]; 
            this.reset(); 
            this.toast.success("Berhasil Memperbarui data...","Informasi");
           },
      });   
    } 
  }
  _dataDelete(ind:number){ 
    const { kdProv, kdKab, pass,kdUser } = this.duser[ind]; 

    const model =<Mpengguna>{};  
    model.kdUser = kdUser;  
    this.epengguna.delPengguna(model)?.subscribe({
        next: (v) => {  
          this.duser = [...this.duser].filter((v1,i1)=>i1!=ind);
          this.toast.success("Berhasil Menghapus data...","Informasi");
        },
    }); 

  }

  ngOnInit(): void {  
    this.Ekab.getAllData().subscribe({
      next: (v) => {  
        this.dkab=v; 
      },
    });

    this.epengguna.__pengguna()?.subscribe({
      next: (v) => {   
        this.duser=v; 
      },
    });

    this.erole.__role().subscribe({
      next: (v) => {   
        this.drole=v; 
      },
    });

     this.user1= Mbase.checkLevel();
  }

  filterDropdown(f:string) {  
    let e =f;
    if(f=="bgs"){
      e = String(this.search.value); 
    } 
    let i =1;  
    this.filteredList = [...this.dkab].filter((item)=>{  
      if(i<10){
        if (e === "") {
            i++;
            return item;
        } else if (
          String(item.nmKab).toLowerCase().includes(e.toLowerCase())
        ) {
          i++;
          return item;
          
        } 
      }
    }); 
  } 
  checkForm():boolean{
    if ( this.username &&  this.pass) {
      try {
        if(String(this.username.value).length < 10 ){
          throw 'Username sebanyak 10 digit'; 
        } 
        if(this.kdRA==''){
          throw 'Mohon unttuk memilih Role Access';
        } 
        return true;
      } catch (error) {  
        this.toast.error(String(error), 'Error!');
      } 
    }else{
      this.toast.error('Mohon Entri Usernama dan password !!!', 'Toastr fun!'); 
    } 
    return false;
  }
  addUser() { 
    if(this.checkForm()){
      const model =<Mpengguna>{};
      model.kdProv = this.selectedValue.kdProv; 
      model.kdKab = this.selectedValue.kdKab;

      model.nama = String(this.nama.value);
      model.username = String(this.username.value);
      model.pass = String(this.pass.value);

      model.kdRA = String(this.kdRA); 
      let cek = 1;
      this.epengguna._pengguna(model)?.subscribe({
          next: (v) => { 
            this.duser = [...v];  
            //  this.duser = [...this.duser,{...model, nmKab:this.selectedValue.nmKab,nmProv:'belum diload..'}] ;
            this.reset();
            cek = 0;
            // this.router.navigateByUrl("/dash");
          },
      });   
    } 
  }

  reset(){
    this.nama=new FormControl('');
    this.username=new FormControl('');
    this.pass=new FormControl('');
    this.changeForm();
  }
  
  onchanged(kd:Event){ 
    this.kdRA=String((kd.target as HTMLSelectElement).value);
  }
}
