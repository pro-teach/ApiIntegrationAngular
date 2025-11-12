import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.services';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], // ✅ RouterModule added here
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  loading = true;
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert('Delete failed')
      });
    }
  }
}
