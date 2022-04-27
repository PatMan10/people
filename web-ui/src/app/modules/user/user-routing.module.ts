import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../shared/utils/urls';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  // auth
  { path: UiUrls.user.VIEW_BY_ID, component: UserDetailComponent },
  { path: UiUrls.user.EDIT, component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
