import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let serviceMock: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    serviceMock = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(serviceMock).toBeTruthy();
  });

  it('should return data for getAllUsers', () => {
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
    httpMock.verify();
  });
});
