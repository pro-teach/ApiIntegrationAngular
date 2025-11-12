import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.services';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent {
  employee: Employee = { name: '', department: '', designition: '' };
  loading = true;
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid employee ID';
      this.loading = false;
      return;
    }

    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employee details.';
        this.loading = false;
      }
    });
  }

updateEmployee() {
  if (!this.employee.name || !this.employee.department || !this.employee.designition) {
    this.error = 'Please fill all fields';
    return;
  }

  this.saving = true;

  const payload = {
    ID: this.employee.id, // backend expects "ID"
    Name: this.employee.name,
    Department: this.employee.department,
    Designition: this.employee.designition
  };

  this.employeeService.updateEmployee(payload).subscribe({
    next: () => {
      alert('Employee updated successfully');
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Update error:', err);
      this.error = 'Failed to update employee.';
      this.saving = false;
    }
  });
}


  cancel() {
    this.router.navigate(['/']);
  }
}
