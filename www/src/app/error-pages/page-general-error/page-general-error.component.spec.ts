import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGeneralErrorComponent } from './page-general-error.component';

describe('PageGeneralErrorComponent', () => {
  let component: PageGeneralErrorComponent;
  let fixture: ComponentFixture<PageGeneralErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGeneralErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGeneralErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
