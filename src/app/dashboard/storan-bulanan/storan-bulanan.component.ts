import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Esetoran } from './state/model';
import { Msetoran } from './state/model';

import { EsubSumber } from '../sumber-penerimaan/state/model';

import * as Mbase from "../../utils/support" 

@Component({
  selector: 'app-storan-bulanan',
  standalone: true,
  imports:  [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './storan-bulanan.component.html',
  styleUrl: './storan-bulanan.component.css'
})
export class StoranBulananComponent implements OnInit{

  constructor( 
    private readonly estor:Esetoran,
    private readonly esub:EsubSumber,
    private toast : ToastrService 
  ){}

  dform:any={
    on:true,
    idt:-1, //index informasi
    ins:1
  }
  search = new FormControl('');
  dateS = new FormControl('');
  total = new FormControl('');

  dstor:any;
  
  dsub:any;
  lsub: any;

  selUraian :any={};
  

  ngOnInit(): void {  
    this.esub.__subSumber().subscribe({
      next: (v) => {  
        this.setdtx(v);
      },
    });   

    this.estor.__setor().subscribe({
      next: (v) => {   
        this.dstor=[...v];
      },
    });  
  } 
  filterDropdown(f:string) {  
    let e =f;
    if(f=="bgs"){
      e = String(this.search.value); 
    } 
    let i =1;  
    this.lsub = [...this.dsub].filter((item)=>{  
      if(i<10){
        if (e === "") {
            i++;
            return item;
        } else if (
          String(item.nmKS).toLowerCase().includes(e.toLowerCase()) || String(item.nmSS).toLowerCase().includes(e.toLowerCase())
        ) {
          i++;
          return item;
          
        } 
      }
    }); 
  } 
  sel_uraian(i:number){
    this.selUraian=this.lsub[i];
  }
  changeForm(){ 
    this.dform={
      ...this.dform,
      on:1,
      ins:1
    }
    // this.nmKab = new FormControl(''); 
  }
  checkForm():boolean{
    try { 
      if(Object.keys(this.selUraian).length ==0 ) {
        throw "Pilih Jenis Uraian";
      }  
       
      if(this.dateS.value=='') {
        throw "Tambahkan Tanggal Penyetoran ";
      }  
      
      if(Number(this.total.value)<=0 ) {
        throw "Tambahkan Total Setoran"; 
      }
      return true
    } catch (error) {  
      this.toast.error(String(error), 'Error!');
      return false;
    }  
    return true;
  }
  clk_add(){
    if(this.checkForm()){
      const model =<Msetoran>{};
      model.kdSS=(String(this.selUraian.kdKS+"|"+this.selUraian.kdSS));
      model.dateS=String(this.dateS.value);
      model.totol=String(this.total.value); 

      this.estor._setor(model).subscribe({
          next: (v) => {  
            this.dstor=[...v];
            this.reset()
          },
      });  
    }
  }
  setdtx(xdt:any){
    this.dsub=[...xdt].map((v,i)=>{
      return {...v,i}
    });
    this.lsub=this.dsub.slice(0,15);
  }
  clk_setUpd(i:number){
    const { total, dateS,kdKS,kdSS,nmSS  } = this.dstor[i];
    this.total = new FormControl(total);
    this.dateS = new FormControl(dateS); 
    this.selUraian = {kdKS,kdSS,nmSS};   
    
    this.dform={
      ...this.dform,
      on:1,
      ins:0,
      idt:i
    } 
  }
  clk_upd(){
    if(this.checkForm()){
      const model =<Msetoran>{};
      model.kdSS=(String(this.selUraian.kdKS+"|"+this.selUraian.kdSS));
      model.dateS=String(this.dateS.value);
      model.totol=String(this.total.value); 


      model.kdSetoran=this.dstor[this.dform.idt].kdSetoran; 

      this.estor.updsetor(model).subscribe({
          next: (v) => {  
            this.dstor=[...v];
            this.reset()
          },
      });  
    }
  }
  clk_setDel(i:number){
    const model =<Msetoran>{}; 
    model.kdSetoran=this.dstor[i].kdSetoran; 

    this.estor.delsetor(model).subscribe({
        next: (v) => {  
          this.dstor = [...this.dstor].filter((v1,i1)=>i1!=i);
          this.onc_searchList();
          this.reset()
        },
    });  
  }
  onc_searchList(){
    // const e = String(this.search.value);
    // let i=0;
    // this.lsub = [...this.dsub].filter((item)=>{  
    //   if(i<15){
    //     if (e === "") {
    //         i++;
    //         return item;
    //     } else if (
    //       String(item.nmSS).toLowerCase().includes(e.toLowerCase()) || String(item.nmKS).toLowerCase().includes(e.toLowerCase())
    //     ) {
    //       i++;
    //       return item;
          
    //     } 
    //   }
    // });
  }
  clk_setInfo(i:number){ 
    this.dform={
      ...this.dform,
      on:false,
      idt:i
    }
  }
  toUang(e:string){
    return Mbase._$(e);
  }
  hitungPersen(e:string,p:string){
    return this.toUang(String( (Number(e)*Number(p))/100 ))
  }
  reset(){
    this.dateS=new FormControl(''); 
    this.total=new FormControl('');  
  }
}
