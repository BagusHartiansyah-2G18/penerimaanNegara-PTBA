import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Mrole } from './model';
export interface Istate {
  dt: Mrole[];
}

 
@Injectable() 
export class STkab extends ComponentStore<Istate> {
  constructor() {
    super({ // default state
      dt: [],
    });
  } 
  readonly dt$ = this.select(({ dt }) => dt); 
  readonly _update = this.updater((state, dt: Mrole[] | null) => ({
    ...state,
    dt: dt || [],
  }));
}