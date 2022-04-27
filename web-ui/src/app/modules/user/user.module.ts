import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [UserDetailComponent, UserFormComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
