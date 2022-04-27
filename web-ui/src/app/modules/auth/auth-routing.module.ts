import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../shared/utils/urls';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [
  // auth
  { path: UiUrls.auth.REGISTER, component: RegisterPage },
  { path: UiUrls.auth.LOGIN, component: LoginPage },
  { path: UiUrls.auth.LOGOUT, component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
