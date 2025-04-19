import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeComponent } from './equipe.component';

describe('EquipeComponent', () => {
  let component: EquipeComponent;
  let fixture: ComponentFixture<EquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
