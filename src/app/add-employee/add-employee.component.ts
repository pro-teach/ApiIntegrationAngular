import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.services';
import { Employee } from '../models/employee.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent {
  employee: Employee = { name: '', department: '', designition: '' };
  saving = false;
  error = '';

  constructor(private employeeService: EmployeeService, public router: Router) {}

  addEmployee() {
    if (!this.employee.name || !this.employee.department || !this.employee.designition) {
      this.error = 'Please fill all fields';
      return;
    }

    this.saving = true;
    this.error = '';

    this.employeeService.addEmployee(this.employee).subscribe({
      next: (res: any) => {
        this.saving = false;
        alert('Employee added successfully');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Add failed', err);
        this.error = 'Failed to add employee. See console for details.';
        this.saving = false;
      }
    });
  }
}
