import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiService } from './services/ui.service';
// import { SearchService } from './services/search.service';

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: any;
  let app: any;
  // let search: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent],
      providers: [UiService]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    // search = TestBed.inject(SearchService);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  xit('navigate to "" redirects you to /userlist', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/userlist');
    });
  }));

  xit('navigate to /user/:username', fakeAsync(() => {
    router.navigate(['/user/maria']).then(() => {
      expect(location.path()).toBe('/user/maria');
    });
  }));

  it('should have default light theme', () => {
    expect(app.theme).toEqual('');
  });
});
