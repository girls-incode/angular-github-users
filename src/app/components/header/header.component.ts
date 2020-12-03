import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  checked = false;

  constructor(private uiService: UiService) {}

  changeTheme(event: any): void {
    this.checked = event.checked;
    return event.checked
      ? this.uiService.setTheme('dark-theme')
      : this.uiService.setTheme('');
  }
}
