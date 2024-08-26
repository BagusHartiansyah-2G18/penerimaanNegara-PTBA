import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumberPenerimaanComponent } from './sumber-penerimaan.component';

describe('SumberPenerimaanComponent', () => {
  let component: SumberPenerimaanComponent;
  let fixture: ComponentFixture<SumberPenerimaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumberPenerimaanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumberPenerimaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
