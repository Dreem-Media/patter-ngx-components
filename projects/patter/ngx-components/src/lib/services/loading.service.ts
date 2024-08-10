import { computed, Injectable, signal, Signal } from '@angular/core';

/**
 * Optimized Async Loading Service using Angular Signals
 * Supports global loading state and named loading areas with auto-cleanup
 *
 * To use as a non-singleton service, add to providers array in @Component decorator:
 * @Component({
 *   selector: 'app-example',
 *   templateUrl: './example.component.html',
 *   providers: [LoadingService]
 * })
 *
 * Usage:
 * Set loading: this.loadingService.setLoading(true)
 * - Set loading: this.loadingService.setLoading(true, 'areaName')
 * 
 * - Get loading (template): {{ loadingService.isLoading()() }}
 * - Get loading (template): {{ loadingService.isLoading('areaName')() }}
 * 
 * - Get loading (component): this.loadingService.isLoading()()
 * - Get loading (component): this.loadingService.isLoading('areaName')()
 * 
 * - React to loading changes: effect(() => console.log('Loading:', this.loadingService.isLoading('areaName')()))
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private globalTaskCount = signal(0);
  private loadingAreas = new Map<string, ReturnType<typeof signal<number>>>();

  isLoading(area?: string): Signal<boolean> {
    if (!area) {
      return computed(() => this.globalTaskCount() > 0);
    }

    return computed(() => {
      const areaSignal = this.loadingAreas.get(area);
      return areaSignal ? areaSignal() > 0 : false;
    });
  }

  setLoading(value: boolean, area?: string): void {
    if (!area) {
      this.updateTaskCount(this.globalTaskCount, value);
    } else {
      this.updateNamedAreaLoading(area, value);
    }
  }

  resetLoading(area?: string): void {
    if (!area) {
      this.globalTaskCount.set(0);
    } else if (this.loadingAreas.has(area)) {
      this.loadingAreas.get(area)!.set(0);
      this.loadingAreas.delete(area);
    }
  }

  private updateNamedAreaLoading(area: string, increment: boolean): void {
    let areaSignal = this.loadingAreas.get(area);
    if (!areaSignal && increment) {
      areaSignal = signal(0);
      this.loadingAreas.set(area, areaSignal);
    }

    if (areaSignal) {
      areaSignal.update(count => {
        const newCount = increment ? count + 1 : Math.max(0, count - 1);
        if (newCount === 0) {
          this.loadingAreas.delete(area);
        }
        return newCount;
      });
    }
  }

  private updateTaskCount(taskCount: ReturnType<typeof signal<number>>, increment: boolean): void {
    taskCount.update(count => increment ? count + 1 : Math.max(0, count - 1));
  }

}
