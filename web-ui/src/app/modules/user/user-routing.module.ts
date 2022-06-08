import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../../utils/urls';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: UiUrls.user.DETAIL, component: UserDetailComponent },
  { path: UiUrls.user.EDIT, component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
