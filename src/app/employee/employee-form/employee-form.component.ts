import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {

  submitted: boolean = false;

  constructor(public service: EmployeeService, private toastr: ToastrService) { }

  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      if (this.service.employeeForm.get('_id')?.value == '')
        this.service.postEmployee()
          .subscribe((response) => {
            this.toastr.success('Created successfully', 'Employee Registered')
            this.service.getEmployeeLists();
            this.resetForm();
          })
      else
        this.service.editEmployee()
          .subscribe((response) => {
            this.toastr.info('Updated successfully', 'Employee Updated')
            this.service.getEmployeeLists();
            this.resetForm();
          })
    }
  }

  resetForm() {
    this.service.employeeForm.reset();
    this.submitted = false;
  }

}
