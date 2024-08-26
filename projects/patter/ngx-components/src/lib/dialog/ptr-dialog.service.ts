import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PtrDialogComponent } from './ptr-dialog/ptr-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PtrDialogService {

  private dialogComponentRef: ComponentRef<PtrDialogComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open(options: {
    title: string;
    message: string;
    buttonText?: string;
    buttonStyle?: 'normal' | 'error' | 'secondary';
  }): Observable<boolean> {
    const dialogResult$ = new Subject<boolean>();

    this.dialogComponentRef = createComponent(PtrDialogComponent, {
      environmentInjector: this.injector,
    });

    const { instance } = this.dialogComponentRef;

    instance.title = options.title;
    instance.message = options.message;
    instance.buttonText = options.buttonText || 'Confirm';
    instance.buttonStyle = options.buttonStyle || 'normal';

    instance.closed.subscribe((result: boolean | null) => {
      this.removeDialog();
      dialogResult$.next(result ?? false);
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
