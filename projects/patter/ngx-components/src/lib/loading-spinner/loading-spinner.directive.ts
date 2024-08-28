import { ComponentRef, Directive, ElementRef, HostBinding, inject, Input, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { PtrLoadingSpinnerComponent } from './loading-spinner.component';

@Directive({
  selector: '[ptrLoadingSpinner]',
  standalone: true
})
export class PtrLoadingSpinnerDirective implements OnDestroy {

  private targetEl = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);

  private spinnerInstance?: ComponentRef<PtrLoadingSpinnerComponent>;
  private overlay?: HTMLElement;

  @HostBinding('style.position') hostPosition = 'relative';

  @Input({ required: true }) set ptrLoadingSpinner(loading: boolean) {
    if (loading) {
      this.addBlurEffect();
      this.addOverlay();
      this.addProgressSpinnerComponent();
    } else {
      this.removeBlurEffect();
      this.removeOverlay();
      this.removeProgressSpinnerComponent();
    }
  }

  ngOnDestroy(): void {
    this.spinnerInstance?.destroy();
    this.removeBlurEffect();
  }

  private addProgressSpinnerComponent(): void {
    this.spinnerInstance = this.viewContainerRef.createComponent(PtrLoadingSpinnerComponent);
    this.overlay?.appendChild(this.spinnerInstance.location.nativeElement);
  }

  private removeProgressSpinnerComponent(): void {
    this.spinnerInstance?.destroy();
  }

  private addOverlay(): void {
    this.overlay = this.renderer.createElement('div');
    this.renderer.setStyle(this.overlay, 'display', 'flex');
    this.renderer.setStyle(this.overlay, 'justify-content', 'center');
    this.renderer.setStyle(this.overlay, 'align-items', 'center');
    this.renderer.setStyle(this.overlay, 'position', 'absolute');
    this.renderer.setStyle(this.overlay, 'top', '0');
    this.renderer.setStyle(this.overlay, 'left', '0');
    this.renderer.setStyle(this.overlay, 'width', '100%');
    this.renderer.setStyle(this.overlay, 'height', '100%');
    this.renderer.setStyle(this.overlay, 'min-height', '25px');

    this.renderer.appendChild(this.targetEl.nativeElement, this.overlay);
  }

  private removeOverlay(): void {
    if (this.overlay) {
      this.renderer.removeChild(this.targetEl.nativeElement, this.overlay);
      this.overlay = undefined;
    }
  }

  private addBlurEffect(): void {
    const style = this.renderer.createElement('style');
    const blurRule = `
      .ptr-loading-blur > *:not(:last-child) {
        filter: blur(2px);
        transition: filter 0.3s ease;
      }
    `;
    this.renderer.appendChild(style, this.renderer.createText(blurRule));
    this.renderer.appendChild(document.head, style);
    this.renderer.addClass(this.targetEl.nativeElement, 'ptr-loading-blur');
  }

  private removeBlurEffect(): void {
    this.renderer.removeClass(this.targetEl.nativeElement, 'ptr-loading-blur');
  }

}
