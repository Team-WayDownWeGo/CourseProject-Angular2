/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovingPostComponent } from './moving-post.component';

describe('MovingPostComponent', () => {
  let component: MovingPostComponent;
  let fixture: ComponentFixture<MovingPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
