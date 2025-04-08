import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employee/employee-add/employee-add.component';
import { EditEmployeeComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    children: [
      { path: 'add', component: AddEmployeeComponent },
      { path: 'edit/:id', component: EditEmployeeComponent },
      { path: 'view/:id', component: EmployeeDetailComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
