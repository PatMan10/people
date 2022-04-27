import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListPage } from './pages/person-list/person-list.page';
import { PersonDetailPage } from './pages/person-detail/person-detail.page';
import { PersonFormPage } from './pages/person-form/person-form.page';

@NgModule({
  declarations: [PersonListPage, PersonDetailPage, PersonFormPage],
  imports: [CommonModule, SharedModule, PersonRoutingModule],
})
export class PersonModule {}
