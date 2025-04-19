import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosComponent } from './recursos.component';

describe('RecursosComponent', () => {
  let component: RecursosComponent;
  let fixture: ComponentFixture<RecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
