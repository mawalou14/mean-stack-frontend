import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getEmployeeLists();
  }

  populateForm(selectedRecord: Employee) {
    this.service.employeeForm.setValue({
      _id: selectedRecord._id,
      fullName: selectedRecord.fullName,
      position: selectedRecord.position,
      location: selectedRecord.location,
      salary: selectedRecord.salary,
    })
  }

  onDelete(_id: string) {
    if (confirm('Are you sure you want to delete this record')) {
      this.service.deleteEmployee(_id)
        .subscribe((res) => {
          this.service.getEmployeeLists();
          this.toastr.error('Deleted successfully', 'Employee Deleted')
        })
    }
  }

}
