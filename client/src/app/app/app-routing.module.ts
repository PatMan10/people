import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from '../person/pages/person-detail/person-detail.component';
import { PersonFormComponent } from '../person/pages/person-form/person-form.component';
import { PersonListComponent } from '../person/pages/person-list/person-list.component';
import { UiUrls } from '../common/utils/urls';

const routes: Routes = [
  { path: '', redirectTo: UiUrls.people.VIEW_ALL, pathMatch: 'full' },
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
