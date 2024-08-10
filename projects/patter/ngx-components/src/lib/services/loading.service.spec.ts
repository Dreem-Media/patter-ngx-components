import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Global Loading', () => {
    it('should start with global loading as false', () => {
      expect(service.isLoading()()).toBeFalse();
    });

    it('should set global loading to true', () => {
      service.setLoading(true);
      expect(service.isLoading()()).toBeTrue();
    });

    it('should set global loading to false', () => {
      service.setLoading(true);
      service.setLoading(false);
      expect(service.isLoading()()).toBeFalse();
    });

    it('should handle multiple global loading calls correctly', () => {
      service.setLoading(true);
      service.setLoading(true);
      expect(service.isLoading()()).toBeTrue();
      service.setLoading(false);
      expect(service.isLoading()()).toBeTrue();
      service.setLoading(false);
      expect(service.isLoading()()).toBeFalse();
    });
  });

  describe('Named Area Loading', () => {
    it('should start with named area loading as false', () => {
      expect(service.isLoading('testArea')()).toBeFalse();
    });

    it('should set named area loading to true', () => {
      service.setLoading(true, 'testArea');
      expect(service.isLoading('testArea')()).toBeTrue();
    });

    it('should set named area loading to false', () => {
      service.setLoading(true, 'testArea');
      service.setLoading(false, 'testArea');
      expect(service.isLoading('testArea')()).toBeFalse();
    });

    it('should handle multiple named area loading calls correctly', () => {
      service.setLoading(true, 'testArea');
      service.setLoading(true, 'testArea');
      expect(service.isLoading('testArea')()).toBeTrue();
      service.setLoading(false, 'testArea');
      expect(service.isLoading('testArea')()).toBeTrue();
      service.setLoading(false, 'testArea');
      expect(service.isLoading('testArea')()).toBeFalse();
    });

    it('should handle multiple named areas independently', () => {
      service.setLoading(true, 'area1');
      service.setLoading(true, 'area2');
      expect(service.isLoading('area1')()).toBeTrue();
      expect(service.isLoading('area2')()).toBeTrue();
      service.setLoading(false, 'area1');
      expect(service.isLoading('area1')()).toBeFalse();
      expect(service.isLoading('area2')()).toBeTrue();
    });
  });

  describe('Reset Loading', () => {
    it('should reset global loading', () => {
      service.setLoading(true);
      service.resetLoading();
      expect(service.isLoading()()).toBeFalse();
    });

    it('should reset named area loading', () => {
      service.setLoading(true, 'testArea');
      service.resetLoading('testArea');
      expect(service.isLoading('testArea')()).toBeFalse();
    });

    it('should not affect other areas when resetting a specific area', () => {
      service.setLoading(true, 'area1');
      service.setLoading(true, 'area2');
      service.resetLoading('area1');
      expect(service.isLoading('area1')()).toBeFalse();
      expect(service.isLoading('area2')()).toBeTrue();
    });
  });

  describe('Auto-Cleanup', () => {
    it('should remove named area when loading count reaches zero', () => {
      service.setLoading(true, 'testArea');
      service.setLoading(false, 'testArea');
      // We can't directly test the map size, so we'll test the behavior
      service.setLoading(true, 'testArea');
      expect(service.isLoading('testArea')()).toBeTrue();
    });

    it('should not create an entry for a named area when decrementing from zero', () => {
      service.setLoading(false, 'nonExistentArea');
      // Again, we test the behavior
      expect(service.isLoading('nonExistentArea')()).toBeFalse();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggling of loading state', () => {
      for (let i = 0; i < 100; i++) {
        service.setLoading(i % 2 === 0, 'toggleArea');
      }
      expect(service.isLoading('toggleArea')()).toBeFalse();
    });

    it('should handle a large number of named areas', () => {
      for (let i = 0; i < 1000; i++) {
        service.setLoading(true, `area${i}`);
      }
      for (let i = 0; i < 1000; i++) {
        expect(service.isLoading(`area${i}`)()).toBeTrue();
      }
    });
  });
});