import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'forms/chip-input',
		pathMatch: 'full',
	},
	{
		path: 'forms/chip-input',
		loadComponent: () => import('./pages/forms/chip-input-demo/chip-input-demo.component').then(m => m.default),
		title: 'Chip Input Demo',
	},
	{
		path: 'forms/input',
		loadComponent: () => import('./pages/forms/input-demo/input-demo.component').then(m => m.default),
		title: 'Input Demo',
	},
	{
		path: 'forms/select',
		loadComponent: () => import('./pages/forms/select-demo/select-demo.component').then(m => m.default),
		title: 'Select Demo',
	},
	{
		path: 'forms/multi-select',
		loadComponent: () => import('./pages/forms/multi-select-demo/multi-select-demo.component').then(m => m.default),
		title: 'Multi-Select Demo',
	}
];
