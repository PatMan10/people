import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonFilterDialogComponent } from './components/person-filter-dialog/person-filter-dialog.component';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
    PersonFormComponent,
    PersonFilterDialogComponent,
  ],
  imports: [SharedModule, PersonRoutingModule],
})
export class PersonModule {}
