import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
];
