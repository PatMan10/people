import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../../utils/urls';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

const routes: Routes = [
  { path: UiUrls.person.LIST, component: PersonListComponent },
  { path: UiUrls.person.DETAIL, component: PersonDetailComponent },
  { path: UiUrls.person.ADD, component: PersonFormComponent },
  { path: UiUrls.person.EDIT, component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
