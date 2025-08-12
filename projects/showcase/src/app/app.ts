import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header style="padding: .75rem 1rem; display: flex; gap: 1rem; align-items: center; border-bottom: 1px solid #eee;">
      <h1 style="font-size: 1.1rem; margin: 0;">Patter Showcase</h1>
      <nav style="display: flex; gap: .75rem;">
        <a routerLink="/forms/chip-input">Chip Input</a>
        <a routerLink="/forms/input">Input</a>
        <a routerLink="/forms/select">Select</a>
      </nav>
    </header>

    <main class="gform_wrapper">
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('showcase');
}
