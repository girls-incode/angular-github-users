import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from '../../services/search.service';
import { of } from 'rxjs';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
class MockSearchService extends SearchService {
  getAllUsers = (): any => {
    return of('');
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let testService: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [SearchComponent],
      providers: [SearchService],
    }).compileComponents();
  });

  beforeEach(() => {
    // TestBed.overrideComponent(
    //     SearchComponent,
    //     { set: { providers: [{ provide: SearchService, useClass: MockSearchService }] } }
    // );
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    testService = TestBed.inject(SearchService);
    httpTestingController = TestBed.inject(HttpTestingController);

    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // expect(componentService instanceof MockSearchService).toBeTruthy();
  });

  it('invalid form', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('form change the input', () => {
    component.searchField.valueChanges.subscribe(res => {
      expect(res).toEqual('ana');
    });
    component.searchField.setValue('ana');
  });

  xit('search should return users', fakeAsync(() => {
    let response = {
      'login': 'mojombo',
      'id': 1,
      'url': 'https://api.github.com/users/mojombo',
      'html_url': 'https://github.com/mojombo',
      'name': 'Tom Preston-Werner',
      'company': '@chatterbugapp',
      'blog': 'http://tom.preston-werner.com',
      'location': 'San Francisco',
      'email': null,
      'hireable': null,
    };

    component.searchField.setValue('mojombo');
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'https://api.github.com/users/mojombo'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick();
  })
  );
});
