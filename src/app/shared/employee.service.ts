import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:3000/api/employees/';
  // readonly baseUrl = 'https://employee-management-api-lymo.onrender.com/api/employees';

  list: Employee[] = [];

  employeeForm = this.fb.group({
    _id: [null],
    fullName: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    salary: ['', Validators.required],
  });

  getEmployeeLists() {
    this.http.get(this.baseUrl)
      .pipe(catchError(this.errorHandler))
      .subscribe(data => {
        this.list = data as Employee[];
        console.log(data);
      })
  }

  postEmployee() {
    return this.http.post(this.baseUrl, this.employeeForm.value)
      .pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error Occured: ' + error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
      );
    }
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }
}
