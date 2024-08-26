import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoranBulananComponent } from './storan-bulanan.component';

describe('StoranBulananComponent', () => {
  let component: StoranBulananComponent;
  let fixture: ComponentFixture<StoranBulananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoranBulananComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoranBulananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
