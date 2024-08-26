import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayaSetoranComponent } from './wilaya-setoran.component';

describe('WilayaSetoranComponent', () => {
  let component: WilayaSetoranComponent;
  let fixture: ComponentFixture<WilayaSetoranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WilayaSetoranComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WilayaSetoranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
