import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../shared/utils/urls';
import { PersonListPage } from './pages/person-list/person-list.page';
import { PersonDetailPage } from './pages/person-detail/person-detail.page';
import { PersonFormPage } from './pages/person-form/person-form.page';

const routes: Routes = [
  { path: UiUrls.person.VIEW_ALL, component: PersonListPage },
  { path: UiUrls.person.VIEW_BY_ID, component: PersonDetailPage },
  { path: UiUrls.person.ADD, component: PersonFormPage },
  { path: UiUrls.person.EDIT, component: PersonFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
