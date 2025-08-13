import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtrInputComponent } from '@patter/ngx-components';
import { Observable, of, delay, map } from 'rxjs';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PtrInputComponent],
  template: `
    <section style="padding: 1rem; display: grid; gap: 1rem; max-width: 800px; margin: 0 auto;">
      <h2>PtrInputComponent</h2>

      <ptr-input
        [label]="'Basic text'"
        [placeholder]="'Type something'"
        [labelPosition]="'top'"
        [ngModel]="textValue"
        (ngModelChange)="textValue = $event"
      />

      <div>
        <strong>Value:</strong> {{ textValue }}
      </div>

      <ptr-input
        [type]="'textarea'"
        [label]="'Multiline'"
        [placeholder]="'Say more…'"
        [ngModel]="textAreaValue"
        (ngModelChange)="textAreaValue = $event"
      />

      <ptr-input
        [type]="'search'"
        [label]="'Search with suggestions'"
        [placeholder]="'Type 3+ chars'"
        [dialogHelpText]="'Pick a suggestion'"
        [searchFn]="search"
        [ngModel]="searchValue"
        (ngModelChange)="searchValue = $event"
      />

      <div>
        <strong>Search value:</strong> {{ searchValue }}
      </div>
    </section>
  `,
})
export default class InputDemoComponent {
  textValue = '';
  textAreaValue = '';
  searchValue = '';

  private all = ['angular', 'signals', 'components', 'forms', 'buttons', 'tabs', 'tooltips', 'toasts'];

  // Fake async search
  search = (term: string): Observable<string[]> => {
    const lower = term.toLowerCase();
    return of(this.all).pipe(
      delay(150),
      map(arr => arr.filter(x => x.includes(lower)))
    );
  };
}
