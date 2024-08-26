import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagemenPenggunaComponent } from './menagemen-pengguna.component';

describe('MenagemenPenggunaComponent', () => {
  let component: MenagemenPenggunaComponent;
  let fixture: ComponentFixture<MenagemenPenggunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenagemenPenggunaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagemenPenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
