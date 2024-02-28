import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from './Services/EmployeesServices/employees.service';
import { EmployeeInformationDialogComponent } from './Components/employee-information-dialog/employee-information-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './Models/employee';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Luftborn_Angular_Task';
  employees: Employee[] = [];
  imageFile!: string;

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe({
      next: (data: any) => { console.log(data); this.employees = data },
      error: (err) => { console.log(err) }
    })
  }
  createUser(employee: Employee) {
    this.employeesService.addEmployee(employee).subscribe({
      next: (data: any) => { console.log(data) },
      error: (err) => { console.log(err) },
      complete: () => {
        console.log("Add user done"); this.getAllEmployees();
        Swal.fire({
          icon: "success",
          title: "User Added Successfully",
        })
      }
    })
  }
  updateUser(employee: Employee) {
    this.employeesService.updateEmployee(employee).subscribe({
      next: (data: any) => { console.log(data) },
      error: (err) => { console.log(err) },
      complete: () => { console.log("update user done"); this.getAllEmployees() ;
      Swal.fire({
        icon: "success",
        title: "User Updated Successfully",
      })
    }
    })
  }
  deleteUser(employee: Employee) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employees = this.employees.filter(e => e.id !== employee.id);
        this.employeesService.deleteEmployee(employee).subscribe({
          next: (data: any) => { console.log(data) },
          error: (err) => { console.log(err) },
          complete: () => { console.log("Delete user done") }
        })
      }
    })
  }
  openAddNewUserDialog(): void {
    const dialogRef = this.dialog.open(EmployeeInformationDialogComponent, { data: { employee: null } });
    dialogRef.beforeClosed().subscribe(result => {
      if (result !== undefined && result.isAddingNewUser) {
        console.log(result);
        this.createUser(result.employee)
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  opneEditUserDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeInformationDialogComponent, { data: { employee: employee } });
    dialogRef.beforeClosed().subscribe(result => {
      if (result !== undefined && !result.isAddingNewUser) {
        console.log(result);
        this.updateUser(result.employee)
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
