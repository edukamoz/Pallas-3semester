import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidasComponent } from './duvidas.component';

describe('DuvidasComponent', () => {
  let component: DuvidasComponent;
  let fixture: ComponentFixture<DuvidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuvidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuvidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
