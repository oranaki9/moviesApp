import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconComponent } from './add-icon.component';
import { HttpClientModule } from '@angular/common/http';

xdescribe('AddIconComponent', () => {
  let component: AddIconComponent;
  let fixture: ComponentFixture<AddIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIconComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
