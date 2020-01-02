import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCategoryPage } from './tech-category.page';

describe('TechCategoryPage', () => {
  let component: TechCategoryPage;
  let fixture: ComponentFixture<TechCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
