import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DialogResult, PtrDialogComponent } from './ptr-dialog/ptr-dialog.component';

export interface PtrDialogOptions<T = unknown> {
  title: string;
  message?: string;
  buttonText?: string;
  buttonStyle?: 'normal' | 'error' | 'secondary';
  contentTemplate?: TemplateRef<unknown>;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class PtrDialogService {

  private dialogComponentRef: ComponentRef<PtrDialogComponent<unknown>> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open<T = unknown>(options: PtrDialogOptions<T>): Observable<DialogResult<T>> {
    const dialogResult$ = new Subject<DialogResult<T>>();

    this.dialogComponentRef = createComponent(PtrDialogComponent as Type<PtrDialogComponent<unknown>>, {
      environmentInjector: this.injector,
    });

    if (!this.dialogComponentRef) {
      throw new Error('Failed to create dialog component');
    }

    const { instance } = this.dialogComponentRef;

    instance.title = options.title;
    instance.message = options.message || '';
    instance.buttonText = options.buttonText || 'Confirm';
    instance.buttonStyle = options.buttonStyle || 'normal';

    if (options.contentTemplate) {
      instance.contentTemplate = options.contentTemplate;
      instance.hasDefaultContent = !options.contentTemplate;
    }

    if (options.data !== undefined) {
      instance.data = options.data as unknown;
    }

    instance.closed
      .pipe(take(1))
      .subscribe((result: DialogResult<unknown>) => {
        this.removeDialog();
        dialogResult$.next(result as unknown as DialogResult<T>);
        dialogResult$.complete();
      });

    document.body.appendChild(this.dialogComponentRef.location.nativeElement);
    this.appRef.attachView(this.dialogComponentRef.hostView);

    return dialogResult$.asObservable();
  }

  private removeDialog() {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }

}
