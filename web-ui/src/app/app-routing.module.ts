import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from './modules/shared/utils/urls';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{ path: UiUrls.INDEX, component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
