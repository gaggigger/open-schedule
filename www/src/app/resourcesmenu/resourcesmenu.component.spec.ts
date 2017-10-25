import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesmenuComponent } from './resourcesmenu.component';

describe('ResourcesmenuComponent', () => {
  let component: ResourcesmenuComponent;
  let fixture: ComponentFixture<ResourcesmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
