import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
    PersonFormComponent,
  ],
  imports: [SharedModule, PersonRoutingModule],
})
export class PersonModule {}
