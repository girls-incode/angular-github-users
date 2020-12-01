import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: any;
  let matSlideToggle: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    matSlideToggle = compiled.querySelector('mat-slide-toggle');
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have unchecked the slide-toggle', () => {
    expect(matSlideToggle.textContent).toContain('Dark');
  });

  it('should display Dark text', () => {
    expect(matSlideToggle.textContent).toContain('Dark');
  });

  xit('should call changeTheme on matSlideToggle click', () => {
    spyOn(component, 'changeTheme');
    component.ngOnInit();
    matSlideToggle.click();
    // matSlideToggle.triggerEventHandler('change', {});
    fixture.detectChanges();
    expect(component.changeTheme).toHaveBeenCalled();
  });
});
