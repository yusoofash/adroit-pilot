import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsTextboxComponent } from './keywords-textbox.component';

describe('KeywordsTextboxComponent', () => {
  let component: KeywordsTextboxComponent;
  let fixture: ComponentFixture<KeywordsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
