import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicelistComponent } from './choicelist.component';

describe('ChoicelistComponent', () => {
  let component: ChoicelistComponent;
  let fixture: ComponentFixture<ChoicelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
