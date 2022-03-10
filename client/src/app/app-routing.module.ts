import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PersonDetailComponent } from './pages/person-detail/person-detail.component';
import { PersonFormComponent } from './pages/person-form/person-form.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { UiUrls } from './utils/urls';

const routes: Routes = [
  { path: '', redirectTo: UiUrls.DASHBOARD, pathMatch: 'full' },
  { path: UiUrls.DASHBOARD, component: DashboardComponent },
  { path: UiUrls.people.VIEW_ALL, component: PersonListComponent },
  { path: UiUrls.people.VIEW_BY_ID, component: PersonDetailComponent },
  { path: UiUrls.people.ADD, component: PersonFormComponent },
  { path: UiUrls.people.EDIT, component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
