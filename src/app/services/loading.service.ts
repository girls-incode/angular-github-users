import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(false);

  showLoading(): void {
    this.subject.next(true);
  }
  hideLoading(): void {
    this.subject.next(false);
  }

  constructor() {}
}
