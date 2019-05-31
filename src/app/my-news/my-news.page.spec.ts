import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewsPage } from './my-news.page';

describe('MyNewsPage', () => {
  let component: MyNewsPage;
  let fixture: ComponentFixture<MyNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
