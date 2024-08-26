import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EsubSumber } from './state/model';
import { Msumber } from './state/model';

@Component({
  selector: 'app-sumber-penerimaan',
  standalone: true,
  imports:  [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './sumber-penerimaan.component.html',
  styleUrl: './sumber-penerimaan.component.css'
})
export class SumberPenerimaanComponent implements OnInit{
  constructor( 
    private readonly esub:EsubSumber,
    private toast : ToastrService 
  ){

  }
  dform:any={
    on:true,
    idt:-1, //index informasi
    ins:1
  }

  dsub:any;
  lsub:any;
  dkategori:any;
  kdKS:string='';

  search = new FormControl('');
  nmSS = new FormControl('');
  kabP = new FormControl('');
  provP = new FormControl('');
  pusatP = new FormControl('');

  
  ngOnInit(): void {  
    this.esub.__kategoriSumber().subscribe({
      next: (v) => {  
        this.dkategori=[...v];
      },
    });   

    this.esub.__subSumber().subscribe({
      next: (v) => {   
        this.setdtx(v);
      },
    });  
  } 
  changeForm(){ 
    this.dform={
      ...this.dform,
      on:1,
      ins:1
    }
    this.nmSS = new FormControl('');
    this.kabP = new FormControl('');
    this.provP = new FormControl('');
    this.pusatP = new FormControl('');

  }

  onc_KategoriSumber(e:Event){
    this.kdKS = String((e.target as HTMLSelectElement).value);
  }

  checkForm():boolean{
    try { 
      if(this.nmSS.value=='' ) {
        throw "Tambahkan Nama Uraian";
      }  
      if(this.kabP.value=='' ) { 
        if(String(this.kabP.value)!='0'){ 
          throw "Tambahkan Persentasi Kabupatan ";
        } 
      }  
      if(this.provP.value=='') {
        if(String(this.provP.value)!='0'){ 
          throw "Tambahkan Persentasi Provinsi ";
        }
      }   
      
      if(this.pusatP.value=='') {
        if(String(this.pusatP.value)!='0'){ 
          throw "Tambahkan Persentasi Pusat ";
        } 
      }  
      
      if(this.kdKS=='' ) {
        throw "Pilih Kategori Sumber";
      }  

      const total = Number(this.kabP.value) + Number(this.provP.value) + Number(this.pusatP.value);
      if(total != 100){
        throw "Mohon digenapkan 100%";
      }
      return true
    } catch (error) {  
      this.toast.error(String(error), 'Error!');
      return false;
    }  
  }
  clk_add(){
    if(this.checkForm()){
      const model =<Msumber>{};
      model.kdKS=this.kdKS; 
      model.nmSS=String(this.nmSS.value);
      model.kabP=String(this.kabP.value);
      model.provP=String(this.provP.value);
      model.pusatP=String(this.pusatP.value); 

      this.esub._subSumber(model).subscribe({
          next: (v) => {  
            this.setdtx(v); 
            this.reset()
          },
      });  
    }
  }
  setdtx(xdt:any){
    this.dsub=[...xdt].map((v,i)=>{
      return {...v,i}
    });
    this.lsub=this.dsub.slice(0,15)
  }
  clk_setUpd(i:number){
    const { nmSS, kabP,provP,pusatP,kdKS  } = this.lsub[i];
    this.nmSS = new FormControl(nmSS);
    this.kabP = new FormControl(kabP); 
    this.provP = new FormControl(provP); 
    this.pusatP = new FormControl(pusatP); 
    
    this.kdKS = kdKS;  
    
    this.dform={
      ...this.dform,
      on:1,
      ins:0,
      idt:this.lsub[i].i
    } 
  }
  clk_upd(){
    if(this.checkForm()){
      const model =<Msumber>{};
      model.kdKS=this.kdKS; 
      model.nmSS=String(this.nmSS.value);
      model.kabP=String(this.kabP.value);
      model.provP=String(this.provP.value);
      model.pusatP=String(this.pusatP.value); 

      model.xkdKS=this.dsub[this.dform.idt].kdKS;
      model.xkdSS=this.dsub[this.dform.idt].kdSS;

      this.esub.updsubSumber(model).subscribe({
          next: (v) => {  
            this.setdtx(v); 
            this.reset()
          },
      });  
    }
  }
  clk_setDel(i:number){
    const model =<Msumber>{}; 
    model.xkdKS=this.lsub[i].kdKS;
    model.xkdSS=this.lsub[i].kdSS;

    this.esub.delsubSumber(model).subscribe({
        next: (v) => {  
          this.dsub = [...this.dsub].filter((v1,i1)=>i1!=this.lsub[i].i);
          this.onc_searchList();
          this.reset()
        },
    });  
  }
  onc_searchList(){
    const e = String(this.search.value);
    let i=0;
    this.lsub = [...this.dsub].filter((item)=>{  
      if(i<15){
        if (e === "") {
            i++;
            return item;
        } else if (
          String(item.nmSS).toLowerCase().includes(e.toLowerCase()) || String(item.nmKS).toLowerCase().includes(e.toLowerCase())
        ) {
          i++;
          return item;
          
        } 
      }
    });
  }
  reset(){
    this.nmSS=new FormControl(''); 
    this.kabP=new FormControl(''); 
    this.provP=new FormControl(''); 
    this.pusatP=new FormControl(''); 
  }
}
