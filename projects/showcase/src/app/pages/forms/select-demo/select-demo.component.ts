import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtrSelectComponent, PtrOption, PtrOptionGroup } from '@patter/ngx-components';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PtrSelectComponent],
  template: `
    <section style="padding: 1rem; display: grid; gap: 1rem; max-width: 800px; margin: 0 auto;">
      <h2>PtrSelectComponent</h2>

      <ptr-select
        [label]="'Choose item'"
        [description]="'Includes strings, options, and grouped options'"
        [placeholder]="'Pick one'"
        [showSearch]="true"
        [options]="options"
        [(ngModel)]="value"
        (selectionChange)="value = $event"
      />

      <div>
        <strong>Selected:</strong> {{ value }}
      </div>
    </section>
  `,
})
export default class SelectDemoComponent {
  value: string | null = null;

  options: (string | PtrOption | PtrOptionGroup)[] = [
    'angular',
    { label: 'Signals', value: 'signals' },
    {
      groupLabel: 'UI',
      options: [
        { label: 'Buttons', value: 'buttons' },
        { label: 'Tabs', value: 'tabs' },
        { label: 'Forms', value: 'forms' },
      ],
    },
  ];
}
