import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteIconComponent } from './favorite-icon.component';
import { NgReduxModule } from '@angular-redux/store';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
xdescribe('FavoriteIconComponent', () => {
  let component: FavoriteIconComponent;
  let fixture: ComponentFixture<FavoriteIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteIconComponent ],
      imports:[NgReduxModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
