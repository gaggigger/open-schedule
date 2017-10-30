import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGirdComponent } from './resource-gird.component';

describe('ResourceGirdComponent', () => {
  let component: ResourceGirdComponent;
  let fixture: ComponentFixture<ResourceGirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceGirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
