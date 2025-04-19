import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarSenhaComponent } from './recuperar-senha.component';

describe('RecuperarSenhaComponent', () => {
  let component: RecuperarSenhaComponent;
  let fixture: ComponentFixture<RecuperarSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



