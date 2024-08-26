import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebupatenComponent } from './kebupaten.component';

describe('KebupatenComponent', () => {
  let component: KebupatenComponent;
  let fixture: ComponentFixture<KebupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KebupatenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KebupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
