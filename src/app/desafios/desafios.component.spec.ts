import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesafiosComponent } from './desafios.component';

describe('DesafiosComponent', () => {
  let component: DesafiosComponent;
  let fixture: ComponentFixture<DesafiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesafiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesafiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  irParaSite() {
  window.open(https://sqlpd.com/);
  
}

});
