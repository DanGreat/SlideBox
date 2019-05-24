import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCategoryPage } from './health-category.page';

describe('HealthCategoryPage', () => {
  let component: HealthCategoryPage;
  let fixture: ComponentFixture<HealthCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
