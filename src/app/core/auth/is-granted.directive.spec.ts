import { IsGrantedDirective } from './is-granted.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockAuthService } from './auth-testing.helper';

@Component({ selector: 'app-test-component', template: '' })
class TestComponent {}

function createFixture(template: string): ComponentFixture<TestComponent> {
  const fixture = TestBed.overrideComponent(TestComponent, {
    set: { template: template },
  }).createComponent(TestComponent);
  fixture.detectChanges();
  return fixture;
}

describe('IsGrantedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HttpClientTestingModule, IsGrantedDirective],
      providers: [provideMockAuthService],
    });
  });

  it('should show component for enabled role', waitForAsync(() => {
    fixture = createFixture(`<span *appIsGranted="'ROLE_ADMIN'">Hello</span>`);
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(1);
    expect(fixture.nativeElement.textContent).toEqual('Hello');
  }));

  it('should show empty component for not enabled role', waitForAsync(() => {
    fixture = createFixture(`<span *appIsGranted="'ROLE_USER'">Hello</span>`);
    expect(fixture.debugElement.queryAll(By.css('span')).length).toEqual(0);
    expect(fixture.nativeElement.textContent).toEqual('');
  }));
});
