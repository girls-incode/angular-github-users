import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let serviceMock: SearchService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    serviceMock = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(serviceMock).toBeTruthy();
  });

  it('should return data for getAllUsers', () => {
    serviceMock.key = '';
    const data = [
      { id: 1 },
      { id: 2 },
    ];
    serviceMock.getAllUsers().subscribe(val => {
      expect(val.length).toBe(2);
      expect(val).toEqual(data);
    });

    const req = httpMock.expectOne('https://api.github.com/users');
    expect(req.request.method).toEqual('GET');
    req.flush(data);
  });
});
