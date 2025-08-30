import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrMultiSelectComponent } from './ptr-multi-select.component';

describe('PtrMultiSelectComponent', () => {
  let component: PtrMultiSelectComponent;
  let fixture: ComponentFixture<PtrMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrMultiSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle multiple selections', () => {
    component.options = ['Option 1', 'Option 2', 'Option 3'];
    component.onSelectionChanged(['Option 1', 'Option 3']);

    expect(component.value()).toEqual(['Option 1', 'Option 3']);
  });

  it('should remove selected items', () => {
    component.value.set(['Option 1', 'Option 2']);
    component.removeSelectedItem('Option 1');

    expect(component.value()).toEqual(['Option 2']);
  });

  it('should display count when multiple items selected', () => {
    component.options = ['Option 1', 'Option 2', 'Option 3'];
    component.value.set(['Option 1', 'Option 2']);

    expect(component.displayText()).toBe('2 options selected');
  });
});
