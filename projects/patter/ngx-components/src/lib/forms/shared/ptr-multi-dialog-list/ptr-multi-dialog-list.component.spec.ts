import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrMultiDialogListComponent } from './ptr-multi-dialog-list.component';

describe('PtrMultiDialogListComponent', () => {
  let component: PtrMultiDialogListComponent;
  let fixture: ComponentFixture<PtrMultiDialogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrMultiDialogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrMultiDialogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle option selection', () => {
    spyOn(component.selectionChange, 'emit');

    component.toggleOption('option1');
    expect(component.selectedItems()).toContain('option1');
    expect(component.selectionChange.emit).toHaveBeenCalledWith(['option1']);

    component.toggleOption('option1');
    expect(component.selectedItems()).not.toContain('option1');
    expect(component.selectionChange.emit).toHaveBeenCalledWith([]);
  });

  it('should respect max selections', () => {
    component.maxSelections = 2;
    component.toggleOption('option1');
    component.toggleOption('option2');
    component.toggleOption('option3');

    expect(component.selectedItems().length).toBe(2);
    expect(component.canSelectMore()).toBe(false);
  });

  it('should handle select all functionality', () => {
    spyOn(component.selectionChange, 'emit');
    component.options = ['option1', 'option2', 'option3'];

    // Initially nothing selected
    expect(component.allSelectedState()).toBe(false);

    // Select all
    component.toggleSelectAll();
    expect(component.selectedItems()).toEqual(['option1', 'option2', 'option3']);
    expect(component.allSelectedState()).toBe(true);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(['option1', 'option2', 'option3']);

    // Deselect all
    component.toggleSelectAll();
    expect(component.selectedItems()).toEqual([]);
    expect(component.allSelectedState()).toBe(false);
  });

  it('should show indeterminate state when some options are selected', () => {
    component.options = ['option1', 'option2', 'option3'];
    component.selectedItems.set(['option1']);

    expect(component.allSelectedState()).toBe('indeterminate');
  });

  it('should not show select all when options exceed maxSelections', () => {
    component.options = ['option1', 'option2', 'option3', 'option4', 'option5'];
    component.maxSelections = 3;

    expect(component.shouldShowSelectAll()).toBe(false);
  });

  it('should show select all when options are within maxSelections limit', () => {
    component.options = ['option1', 'option2'];
    component.maxSelections = 3;

    expect(component.shouldShowSelectAll()).toBe(true);
  });

  it('should not show select all when disabled', () => {
    component.options = ['option1', 'option2', 'option3'];
    component.showSelectAll = false;

    expect(component.shouldShowSelectAll()).toBe(false);
  });
});
