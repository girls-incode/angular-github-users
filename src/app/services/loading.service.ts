import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(false);

  // loading$: Observable<boolean> = this.subject.asObservable();

  showLoading(): void {
    this.subject.next(true);
  }
  hideLoading(): void {
    this.subject.next(false);
  }

  constructor() {}
}
