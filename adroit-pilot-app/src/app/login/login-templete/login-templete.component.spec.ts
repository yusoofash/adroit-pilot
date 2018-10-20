import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTempleteComponent } from './login-templete.component';

describe('LoginTempleteComponent', () => {
  let component: LoginTempleteComponent;
  let fixture: ComponentFixture<LoginTempleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTempleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
