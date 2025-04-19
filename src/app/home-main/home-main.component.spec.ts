import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainComponent } from './home-main.component';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
