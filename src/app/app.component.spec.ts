import { Location } from '@angular/common';
import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiService } from './services/ui.service';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { SearchService } from './services/search.service';

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParam: any;
  navigateTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigateTo = this.linkParam;
  }
}
@NgModule({
  declarations: [RouterLinkDirectiveStub]
})
export class RouterLinkStubModule { }

describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture: any;
  let app: any;
  // let search: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: [AppComponent],
      providers: [UiService]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    // search = TestBed.inject(SearchService);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    // router.initialNavigation();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  xit('navigate to / redirects you to /userlist', fakeAsync(() => {
    router.navigate(['']).then(() => {
      expect(location.path()).toBe('/userlist');
    });
  }));

  xit('navigate to /user/:username', fakeAsync(() => {
    router.navigate(['/user/maria']).then(() => {
      expect(location.path()).toBe('/user/maria');
    });
  }));

  xit('get routerlinks from template', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    const routerLinks = links.map((el: any) => el.injector.get(RouterLinkDirectiveStub));
    expect(routerLinks.length).toEqual(1);
  });

  it('should have default light theme', () => {
    expect(app.theme).toEqual('');
  });
});
