import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInpComponent } from './search-inp.component';
import { SharedModule } from 'src/app/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { tmdbSearchInjectables } from 'src/app/movies-service/tmdb-search-Injectables';

describe('SearchInpComponent', () => {
  let component: SearchInpComponent;
  let fixture: ComponentFixture<SearchInpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInpComponent ],
      imports:[SharedModule,HttpClientModule],
      providers: [tmdbSearchInjectables],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
