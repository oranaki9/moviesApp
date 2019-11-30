import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageComponent } from './massage.component';

xdescribe('MassageComponent', () => {
  let component: MassageComponent;
  let fixture: ComponentFixture<MassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
