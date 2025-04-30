import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Challange1CssComponent } from './challange-1-css.component';

describe('Challange1CssComponent', () => {
  let component: Challange1CssComponent;
  let fixture: ComponentFixture<Challange1CssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Challange1CssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Challange1CssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
