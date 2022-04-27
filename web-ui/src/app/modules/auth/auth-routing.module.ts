import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiUrls } from '../shared/utils/urls';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  // auth
  { path: UiUrls.auth.REGISTER, component: RegisterComponent },
  { path: UiUrls.auth.LOGIN, component: LoginComponent },
  { path: UiUrls.auth.LOGOUT, component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
