import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailPage } from './pages/user-detail/user-detail.page';
import { UserFormPage } from './pages/user-form/user-form.page';

@NgModule({
  declarations: [UserDetailPage, UserFormPage],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
