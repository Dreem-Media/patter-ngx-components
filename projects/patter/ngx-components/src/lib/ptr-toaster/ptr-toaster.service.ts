import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApplicationRef, ComponentRef, createComponent, DestroyRef, EnvironmentInjector, inject, Injectable, Injector, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { PtrToast } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class PtrToasterService {

  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private toasts = signal<PtrToast[]>([]);
  private counter = 0;
  private toasterComponentRef: ComponentRef<unknown> | null = null;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      if (this.toasterComponentRef) {
        this.appRef.detachView(this.toasterComponentRef.hostView);
        this.toasterComponentRef.destroy();
        this.toasterComponentRef = null;
      }
    });
    this.injectToasterComponent();
  }

  private injectToasterComponent() {
    if (!this.isBrowser || this.toasterComponentRef || this.destroyed) {
      return;
    }

    import('./ptr-toaster/ptr-toaster.component').then(module => {
      if (this.destroyed) {
        return;
      }

      this.toasterComponentRef = createComponent(module.PtrToasterComponent, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector
      });

      const domElem = this.toasterComponentRef.location.nativeElement;
      this.document.body.appendChild(domElem);
      this.appRef.attachView(this.toasterComponentRef.hostView);
    });
  }

  public getToasts() {
    return this.toasts.asReadonly();
  }

  public show(message: string, type: PtrToast['type'] = 'info') {
    const id = this.counter++;
    this.toasts.update(toasts => [...toasts, { id, message, type }]);

    timer(10000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.remove(id));
  }

  public remove(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

}
