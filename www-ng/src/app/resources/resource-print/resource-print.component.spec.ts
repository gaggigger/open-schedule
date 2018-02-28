import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePrintComponent } from './resource-print.component';

describe('ResourcePrintComponent', () => {
  let component: ResourcePrintComponent;
  let fixture: ComponentFixture<ResourcePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
