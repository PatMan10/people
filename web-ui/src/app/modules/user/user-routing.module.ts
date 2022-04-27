import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../shared/utils/urls';
import { UserDetailPage } from './pages/user-detail/user-detail.page';
import { UserFormPage } from './pages//user-form/user-form.page';

const routes: Routes = [
  // auth
  { path: UiUrls.user.VIEW_BY_ID, component: UserDetailPage },
  { path: UiUrls.user.EDIT, component: UserFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
