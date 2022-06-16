import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonFilterDialog } from './components/person-filter/person-filter.dialog';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
    PersonFormComponent,
    PersonFilterDialog,
  ],
  imports: [SharedModule, PersonRoutingModule],
})
export class PersonModule {}
