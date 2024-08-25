import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtrTabComponent } from './ptr-tab.component';

describe('PtrTabComponent', () => {
  let component: PtrTabComponent;
  let fixture: ComponentFixture<PtrTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtrTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
