import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/new', component: CategoriesFormComponent },
      { path: 'categories/:id', component: CategoriesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
