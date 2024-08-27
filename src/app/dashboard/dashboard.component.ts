import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

import { Esetoran } from './storan-bulanan/state/model';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as XLSX from 'xlsx';
import * as Mbase from "../utils/support" 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:  [CommonModule, ChartModule,FormsModule,ReactiveFormsModule], 
  templateUrl:'./dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor( 
    private readonly estor:Esetoran
  ){}

  dsetor:any;
  dgrafik:any;
  
  data: any;

  options: any;
  dform:any={
    on:true,
    idt:-1, //index informasi
    ins:1
  }
  year:string='';
  bulan:any=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Ock','Nov','Des'];

  dtahun :any=[];

  search = new FormControl('');

  readTahun(){ 
    const tams = [...this.dsetor].map(v1=>String(v1.dateS).substring(0,4));  
    const tams1 = [...new Set(tams)];   
    return {dyear:tams1,year:tams1[0]}
  } 

  onc_tahun(e:Event){
    this.year = String((e.target as HTMLSelectElement).value);
    this.runGrafik(this.dsetor,this.year);
    this.runTable(this.dsetor,this.year);
  }
  ngOnInit() {
    this.estor.__setor().subscribe({
      next: (v) => {  
        this.dsetor =[...v]; 
        const { dyear, year}= this.readTahun();  
        this.dtahun=dyear;
        this.year =year;
        this.runTable([...v],year);
        this.runGrafik([...v],year);

        ;
      },
    });  
    
  }
  toUang(e:string){
    return Mbase._$(e);
  }
  hitungPersen(e:string,p:string){
    return this.toUang(String( (Number(e)*Number(p))/100 ))
  }
  searchList(){

  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb,"export-data-"+this.year+".xlsx"); 
  }
  downloadPDF() {
    const data = document.getElementById('excel-table');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('MYPdf.pdf');
      });
    }
  }
  runGrafik(fdt:any,year:string){
    const dtotBulan = [...this.bulan].map((v,i) => {
      let tot = 0;
      [...this.dsetor].forEach(v1 => { 
          if(String(v1.dateS).substring(0,4)==year && (i+1)==Number(String(v1.dateS).substring(5,7))){
            tot+=Number(v1.total);
          }  
      });
      return tot;
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: this.bulan,
        datasets: [
            {
                label: 'Total Perbulan di tahun'+year,
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data:dtotBulan
            },
            // {
            //     label: 'Prov',
            //     backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            //     borderColor: documentStyle.getPropertyValue('--pink-500'),
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // },
            // {
            //     label: 'Pusat',
            //     backgroundColor: documentStyle.getPropertyValue('--green-500'),
            //     borderColor: documentStyle.getPropertyValue('--green-500'),
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }
  runTable(fdt:any,year:string){
    this.dgrafik= [...this.dsetor].filter(v1 => String(v1.dateS).substring(0,4)==year);
  }
}
