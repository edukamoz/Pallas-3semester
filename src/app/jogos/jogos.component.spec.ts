import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosComponent } from './jogos.component';

describe('JogosComponent', () => {
  let component: JogosComponent;
  let fixture: ComponentFixture<JogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
