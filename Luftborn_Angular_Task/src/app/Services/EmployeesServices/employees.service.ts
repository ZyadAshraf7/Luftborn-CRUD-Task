import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient) { }

  private getEmployeesLink = "https://localhost:7214/api/Employee/GetEmployees";
  getAllEmployees(){
    return this.http.get(this.getEmployeesLink);
  }
  private addEmployeesLink = "https://localhost:7214/api/Employee/AddEmployee";
  addEmployee(employee:Employee){
    return this.http.post(this.addEmployeesLink,employee);
  }
  private updateEmployeeLink = "https://localhost:7214/api/Employee/UpdateEmployee";
  updateEmployee(employee:Employee){
    return this.http.put(this.updateEmployeeLink,employee);
  }
  private deleteEmployeeLink = "https://localhost:7214/api/Employee/DeleteEmployee";
  deleteEmployee(employee:Employee){
    return this.http.delete(this.deleteEmployeeLink,{
      body:employee,
    });
  }
}
