import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let testService: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [SearchComponent],
      providers: [SearchService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    testService = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invalid form by default', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('valid form when input change', () => {
    component.searchField.setValue('ana');
    expect(component.searchForm.valid).toBeTrue();
  });

  it('search change should return a list of users', () => {
    const searchTerm = 'mojombo';
    const response = [
      {
        login: 'mojombo',
        id: 1,
      },
      {
        login: 'jean',
        id: 2,
      },
    ];
    component.searchField.setValue(searchTerm);
    spyOn(component, 'search').and.returnValue(of(response));
    spyOn(testService, 'changeMessage');
    component.ngOnInit();
    expect(testService.changeMessage).toHaveBeenCalledWith([searchTerm, response]);
    // expect(component.searchField.value).toEqual('mojombo');
  });
});
