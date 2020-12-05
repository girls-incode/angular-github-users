import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  key = '';
  private domain = environment.GITHUB_API_URL;
  private query = '?q=';
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
    if (environment.GITHUB_API_KEY) {
      this.key = '?access_token=' + environment.GITHUB_API_KEY;
      this.query = '&q=';
    }
  }

  getAllUsers = (): Observable<any> =>
    this.http.get<any>(`${this.domain}/users${this.key}`);

  getUserByName = (userName: string): Observable<any> =>
    this.http.get<any>(
      `${this.domain}/search/users${this.key}${this.query}${userName}`
    );

  getUserDetails = (userName: string): Observable<any> =>
    this.http.get(`${this.domain}/users/${userName}${this.key}`);

  getUserByURL = (url: string): Observable<any> =>
    this.http.get<any>(url + this.key);

  changeMessage(message: any): void {
    this.messageSource.next(message);
  }
}
