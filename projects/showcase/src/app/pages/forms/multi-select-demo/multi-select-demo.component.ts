import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtrMultiSelectComponent, PtrOption, PtrOptionGroup } from '@patter/ngx-components';

@Component({
  selector: 'app-multi-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PtrMultiSelectComponent],
  template: `
    <form style="padding: 1rem; display: grid; gap: 1rem; max-width: 800px; margin: 0 auto;">
      <h2>PtrMultiSelectComponent</h2>

      <ptr-multi-select
        [label]="'Choose multiple items'"
        [description]="'Click options to immediately add/remove them'"
        [placeholder]="'Pick multiple'"
        [showSearch]="true"
        [options]="options"
        [(ngModel)]="value"
        (selectionChange)="value = $event"
        name="multiSelect"
      />

      <ptr-multi-select
        [label]="'Limited selection (max 3)'"
        [description]="'Select up to 3 items - updates immediately'"
        [placeholder]="'Pick up to 3'"
        [showSearch]="true"
        [maxSelections]="3"
        [options]="options"
        [(ngModel)]="limitedValue"
        (selectionChange)="limitedValue = $event"
        name="limitedMultiSelect"
      />

      <ptr-multi-select
        [label]="'Simple string options'"
        [description]="'Basic multi-select with string options'"
        [options]="simpleOptions"
        [(ngModel)]="simpleValue"
        (selectionChange)="simpleValue = $event"
        name="simpleMultiSelect"
      />

      <ptr-multi-select
        [label]="'No Select All option'"
        [description]="'Multi-select with select all disabled'"
        [showSelectAll]="false"
        [options]="simpleOptions"
        [(ngModel)]="noSelectAllValue"
        (selectionChange)="noSelectAllValue = $event"
        name="noSelectAllMultiSelect"
      />

      <div>
        <strong>Selected (unlimited):</strong> {{ value | json }}
      </div>

      <div>
        <strong>Selected (limited):</strong> {{ limitedValue | json }}
      </div>

      <div>
        <strong>Selected (simple):</strong> {{ simpleValue | json }}
      </div>

      <div>
        <strong>Selected (no select all):</strong> {{ noSelectAllValue | json }}
      </div>
    </form>
  `,
})
export default class MultiSelectDemoComponent {
  value: string[] = [];
  limitedValue: string[] = [];
  simpleValue: string[] = [];
  noSelectAllValue: string[] = [];

  options: (string | PtrOption | PtrOptionGroup)[] = [
    'angular',
    'react',
    'vue',
    { label: 'Signals', value: 'signals' },
    { label: 'TypeScript', value: 'typescript' },
    {
      groupLabel: 'UI Frameworks',
      options: [
        { label: 'Material Design', value: 'material' },
        { label: 'Ant Design', value: 'antd' },
        { label: 'Bootstrap', value: 'bootstrap' },
      ],
    },
    {
      groupLabel: 'Build Tools',
      options: [
        { label: 'Webpack', value: 'webpack' },
        { label: 'Vite', value: 'vite' },
        { label: 'Rollup', value: 'rollup' },
      ],
    },
  ];

  simpleOptions: string[] = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'Purple',
    'Orange'
  ];
}
