import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PtrChipInputComponent, PtrOption, PtrOptionGroup } from '@patter/ngx-components';

@Component({
  selector: 'app-chip-input-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PtrChipInputComponent],
  template: `
    <form style="padding: 1rem; display: grid; gap: 1rem; max-width: 800px; margin: 0 auto;">
      <h2>PtrChipInputComponent</h2>

      <ptr-chip-input
        [label]="'Tags'"
        [description]="'Type to add chips, or pick from suggestions. Press Enter to add.'"
        [placeholder]="'Add tag…'"
        [labelPosition]="'top'"
        [suggestions]="suggestions"
        [maxItems]="8"
        [formControl]="chipsControl"
      />

      <div>
        <h3>Value</h3>
        <pre>{{ chipsControl.value | json }}</pre>
      </div>
  </form>
  `,
})
export default class ChipInputDemoComponent {
  // Simple starting value
  readonly chipsControl = new FormControl<string[] | null>(['angular', 'components']);

  // Suggestions can be strings, options, or grouped options
  readonly suggestions: (string | PtrOption | PtrOptionGroup)[] = [
    'angular',
    'typescript',
    'signals',
    { label: 'Standalone', value: 'standalone' } as PtrOption,
    {
      groupLabel: 'UI',
      options: [
        { label: 'Buttons', value: 'buttons' },
        { label: 'Tabs', value: 'tabs' },
        { label: 'Forms', value: 'forms' },
      ],
    } as PtrOptionGroup,
  ];
}
