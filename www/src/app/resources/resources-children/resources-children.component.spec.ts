import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesChildrenComponent } from './resources-children.component';

describe('ResourcesChildrenComponent', () => {
  let component: ResourcesChildrenComponent;
  let fixture: ComponentFixture<ResourcesChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
