import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private domain = environment.GITHUB_API_URL;
  private key = environment.GITHUB_API_KEY
    ? '?access_token=' + environment.GITHUB_API_KEY
    : '';
  private userData = {};
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllUsers = (): Observable<any> =>
    this.http.get<any>(`${this.domain}/users${this.key}`);

  getUserByName = (userName: string): Observable<any> =>
    this.http.get<any>(`${this.domain}/search/users${this.key}&q=${userName}`);

  getUserDetails = (userName: string): Observable<any> =>
    this.http.get(`${this.domain}/users/${userName}${this.key}`);

  getUserByURL = (url: string): Observable<any> =>
    this.http.get<any>(url + this.key);

  setData(data: any) {
    this.userData = data;
  }

  getData() {
    return this.userData;
  }

  changeMessage(message: any): void {
    this.messageSource.next(message);
  }
}
