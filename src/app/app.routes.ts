import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core'; 

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenagemenPenggunaComponent } from './dashboard/menagemen-pengguna/menagemen-pengguna.component';
import { WilayaSetoranComponent } from './dashboard/wilaya-setoran/wilaya-setoran.component';
import { StoranBulananComponent } from './dashboard/storan-bulanan/storan-bulanan.component';
import { SumberPenerimaanComponent } from './dashboard/sumber-penerimaan/sumber-penerimaan.component';
import { KebupatenComponent } from './dashboard/kebupaten/kebupaten.component';


import {ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from "ng-apexcharts";

import * as Mbase from "../app/utils/support"; 
 


export const routes: Routes = (Mbase.checkLevel()?
    [
        { path: '', component: LoginComponent },
        { path: 'dash', component: DashboardComponent },
        { path: 'menagemenPengguna', component: MenagemenPenggunaComponent },
        { path: 'wilayaSetoran', component: KebupatenComponent },
    
        { path: 'setoran', component: StoranBulananComponent },
        { path: 'sumberPenerimaan', component: SumberPenerimaanComponent } 
    ]:
    [
        { path: '', component: LoginComponent },
        { path: 'dash', component: DashboardComponent },
        { path: 'menagemenPengguna', component: MenagemenPenggunaComponent },
        // { path: 'wilayaSetoran', component: KebupatenComponent },
    
        { path: 'setoran', component: StoranBulananComponent },
        // { path: 'sumberPenerimaan', component: SumberPenerimaanComponent } 
    ]
);
 

@NgModule({
    imports: [
        RouterModule.forRoot(routes), 
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgApexchartsModule
    ], 
    exports: [RouterModule]
})
export class AppRoutingModule { }