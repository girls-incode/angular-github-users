import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private theme = new BehaviorSubject('');
  sharedTheme = this.theme.asObservable();

  setTheme(theme: string): void {
    this.theme.next(theme);
  }
}
