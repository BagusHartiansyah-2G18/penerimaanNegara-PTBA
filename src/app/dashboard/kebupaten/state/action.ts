import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Mkab } from './model';
export interface Istate {
  dt: Mkab[];
}

 
@Injectable() 
export class STkab extends ComponentStore<Istate> {
  constructor() {
    super({ // default state
      dt: [],
    });
  } 
  readonly dt$ = this.select(({ dt }) => dt); 
  readonly _update = this.updater((state, dt: Mkab[] | null) => ({
    ...state,
    dt: dt || [],
  }));
}