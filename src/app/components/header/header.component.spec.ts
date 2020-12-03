import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: any;
  let matSlideToggle: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
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
    expect(component.checked).toBeTrue();
  });

  it('should display Dark text', () => {
    expect(matSlideToggle.textContent).toContain('Dark');
  });

  it('should call changeTheme on matSlideToggle click', () => {
    spyOn(component, 'changeTheme').withArgs({checked: true}).and.callThrough();
    fixture.detectChanges();
    expect(component.checked).toBeTruthy();
    expect(component.changeTheme).toHaveBeenCalled();
    // expect(spy.calls.any()).toEqual(true);
    // matSlideToggle.click();
    // matSlideToggle.triggerEventHandler('change', {});
  });
});
