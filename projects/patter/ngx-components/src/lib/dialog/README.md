# PtrDialog Component and Service

The PtrDialog provides a customizable modal dialog that can display both simple messages and complex custom content.

## Basic Usage

For simple confirmation dialogs, use the dialog service directly:

```typescript
import { PtrDialogService } from 'path/to/ptr-dialog.service';

@Component({...})
export class YourComponent {
  constructor(private dialogService: PtrDialogService) {}

  openConfirmDialog() {
    this.dialogService.open({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      buttonText: 'Yes, Continue',
      buttonStyle: 'normal' // 'normal' | 'error' | 'secondary'
    }).subscribe(result => {
      if (result.result === true) {
        // User confirmed
        console.log('User confirmed the action');
      } else {
        // User cancelled or closed the dialog
        console.log('User cancelled the action');
      }
    });
  }
}
```

## Using Custom Content

For more complex scenarios, you can add custom content to the dialog:

```typescript
import { PtrDialogService } from 'path/to/ptr-dialog.service';

interface FormData {
  name: string;
  email: string;
}

@Component({
  template: `
    <button (click)="openFormDialog()">Open Form Dialog</button>

    <ng-template #formTemplate let-data let-dialogInstance="dialogInstance">
      <div class="form-container">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            id="name" 
            type="text" 
            [(ngModel)]="formData.name" 
            (ngModelChange)="updateDialogData()"
          >
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            type="email" 
            [(ngModel)]="formData.email" 
            (ngModelChange)="updateDialogData()"
          >
        </div>
      </div>
    </ng-template>
  `
})
export class YourComponent {
  @ViewChild('formTemplate') formTemplate!: TemplateRef<any>;
  
  formData: FormData = {
    name: '',
    email: ''
  };

  constructor(private dialogService: PtrDialogService) {}

  openFormDialog() {
    // Create a copy of the data to avoid modifying the original object
    const initialData: FormData = { ...this.formData };
    
    this.dialogService.open<FormData>({
      title: 'Enter Your Details',
      buttonText: 'Submit',
      contentTemplate: this.formTemplate,
      data: initialData
    }).subscribe(result => {
      if (result.result === true && result.data) {
        // User submitted the form
        this.formData = result.data;
        console.log('Form submitted:', this.formData);
      }
    });
  }

  updateDialogData() {
    // This function updates the dialog's internal data so it can be returned on confirmation
    this.dialogRef.setData(this.formData);
  }
}
```

## API Reference

### PtrDialogService

```typescript
open<T = unknown>(options: PtrDialogOptions<T>): Observable<DialogResult<T>>
```

#### PtrDialogOptions<T>

| Property | Type | Description |
|----------|------|-------------|
| title | string | Dialog title |
| message | string (optional) | Simple message text (not used with custom content) |
| buttonText | string (optional) | Text for the confirm button (default: 'Confirm') |
| buttonStyle | 'normal' \| 'error' \| 'secondary' (optional) | Style of confirm button (default: 'normal') |
| contentTemplate | TemplateRef<unknown> (optional) | Custom content template |
| data | T (optional) | Data to pass to/from the dialog |

#### DialogResult<T>

| Property | Type | Description |
|----------|------|-------------|
| result | boolean \| null | true if confirmed, null if cancelled or closed |
| data | T \| null | Data returned from the dialog | 