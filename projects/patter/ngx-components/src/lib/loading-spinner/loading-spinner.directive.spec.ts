import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtrLoadingSpinnerDirective } from './loading-spinner.directive';

@Component({
  template: '<div ptrLoadingSpinner="true"></div>',
  standalone: true,
  imports: [PtrLoadingSpinnerDirective]
})
class TestComponent {}

describe('PtrLoadingSpinnerDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directiveEl = fixture.debugElement.children[0];
    const directive = directiveEl.injector.get(PtrLoadingSpinnerDirective);
    expect(directive).toBeTruthy();
  });
});
