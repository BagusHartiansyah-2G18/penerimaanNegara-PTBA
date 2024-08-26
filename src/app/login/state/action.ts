import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Mlogin } from './model';
export interface PersonState {
  dt: Mlogin[];
}

 
@Injectable()
// export class PersonStore extends ComponentStore<PersonState> {
//   constructor() {
//     super(defaultState);
//   }

//   readonly people$ = this.select(({ people }) => people);

//   readonly loadPeople = this.updater((state, people: Mlogin[] | null) => ({
//     ...state,
//     people: people || [],
//   }));
// }
export class PersonStore extends ComponentStore<PersonState> {
  constructor() {
    super({ // default state
      dt: [],
    });
  }

  readonly dt$ = this.select(({ dt }) => dt);
 
  
  readonly loadPeople = this.updater((state, dt: Mlogin[] | null) => ({
    ...state,
    dt: dt || [],
  }));
}