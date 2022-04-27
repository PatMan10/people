import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from './modules/shared/utils/urls';

const routes: Routes = [
  { path: '', redirectTo: UiUrls.person.VIEW_ALL, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
