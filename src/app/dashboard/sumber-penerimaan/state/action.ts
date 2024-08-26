import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Mpengguna } from './model';
export interface Istate {
  dt: Mpengguna[];
}

 
@Injectable() 
export class STkab extends ComponentStore<Istate> {
  constructor() {
    super({ // default state
      dt: [],
    });
  } 
  readonly dt$ = this.select(({ dt }) => dt); 
  readonly _update = this.updater((state, dt: Mpengguna[] | null) => ({
    ...state,
    dt: dt || [],
  }));
}