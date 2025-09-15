import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtrInputComponent } from './ptr-input.component';

describe('PtrInputComponent', () => {
  let component: PtrInputComponent;
  let fixture: ComponentFixture<PtrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtrInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PtrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const inputEl: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
    expect(inputEl).toBeTruthy();
    expect(inputEl?.getAttribute('type')).toBe('text');
  });

  it('should render input with type time when set', () => {
    fixture.componentRef.setInput('type', 'time');
    fixture.detectChanges();
    const inputEl: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
    expect(inputEl).toBeTruthy();
    expect(inputEl?.getAttribute('type')).toBe('time');
  });
});
