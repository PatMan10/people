import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

@NgModule({
  declarations: [PersonListComponent, PersonDetailComponent, PersonFormComponent],
  imports: [CommonModule, SharedModule, PersonRoutingModule],
})
export class PersonModule {}
