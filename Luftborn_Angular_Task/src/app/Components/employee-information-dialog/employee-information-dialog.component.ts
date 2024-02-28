import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-information-dialog',
  templateUrl: './employee-information-dialog.component.html',
  styleUrls: ['./employee-information-dialog.component.css']
})
export class EmployeeInformationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmployeeInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) { }

  employeeForm!: FormGroup;
  imageFile!: string;
  roles:string[] = ["Admin","User"]
  ngOnInit(): void {
    this.initEmployeeForm();
  }
  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      id: [this.data.employee?.id || '',],
      email: [this.data.employee?.email || '', [Validators.required, Validators.email]],
      name: [this.data.employee?.name || '', Validators.required],
      role: [this.data.employee?.role || '', Validators.required],
      password: [this.data.employee?.password || '', Validators.required],
      image: [this.data.employee?.image || '',]
    })
  }

  handleFileInput(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageFile = reader.result as string;
        this.employeeForm.get("image")?.setValue(this.imageFile);
        console.log(this.employeeForm.value);
      };
    }
  }

  //----------------------------------- Getters
  get email(){return this.employeeForm.get("email")}
  get name(){return this.employeeForm.get("name")}
  get role(){return this.employeeForm.get("role")}
  get password(){return this.employeeForm.get("password")}

}
