import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { UiService } from './services/ui.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  theme = '';

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.sharedTheme.subscribe((theme) => (this.theme = theme));
  }

  prepareRoute(outlet: RouterOutlet): void {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
