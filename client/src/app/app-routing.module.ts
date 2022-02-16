import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UiUrls } from './utils/urls';

const routes: Routes = [
  { path: '', redirectTo: UiUrls.DASHBOARD, pathMatch: 'full' },
  { path: UiUrls.DASHBOARD, component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
