import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPredictComponent } from './company-predict.component';

describe('CompanyPredictComponent', () => {
  let component: CompanyPredictComponent;
  let fixture: ComponentFixture<CompanyPredictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPredictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
