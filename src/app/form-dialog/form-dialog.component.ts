import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { FormData } from '../form-details/forn.model';
import { FormServiceService } from '../form-service.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent implements OnInit {
  detailsForm!: FormGroup;
  isEdit!: boolean;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData, public service: FormServiceService) { }

  ngOnInit(): void {
    console.log(FormServiceService.id)
    if (this.data && (Object.keys(this.data).length === 0)) {
      this.detailsForm = this.fb.group({
        id: [{ value: this.data.id, disabled: true }],
        sno: [''],
        firstName: [''],
        lastName: [''],
        userName: [''],
        email: ['', [Validators.pattern('^[a-z]+[[a-zA-Z0-9._]+@[a-z]+\.[a-z.]{2,5}$')]],
        gender: [''],
        phoneNo: ['', [Validators.pattern('^[0-9]{10}')]],
      });
      this.isEdit = false;
    } else {
      console.log(this.data)
      this.isEdit = true;
      this.detailsForm = this.fb.group({
        sno: [this.data.sno],
        id: [{ value: FormServiceService.id, disabled: true }],
        firstName: [this.data.firstName],
        lastName: [this.data.lastName],
        userName: [this.data.userName],
        email: [this.data.email, [Validators.pattern('^[a-z]+[[a-zA-Z0-9._]+@[a-z]+\.[a-z.]{2,5}$')]],
        gender: [this.data.gender],
        phoneNo: [this.data.phoneNo, [Validators.pattern('^[0-9]{10}')]],
      });
    }
  }
  get f() {
    return this.detailsForm.controls;
  }
  savedData: any
  onFormSubmits() {
    console.log(this.detailsForm.value)
    const index = this.detailsForm.getRawValue().id;
    let data = this.detailsForm.value;
    data.id = index;

    if (index != null) {
      console.log("update")
      this.savedData = data
      //      // console.log([this.savedData])
      // console.log(this.savedData[FormServiceService.id]=data)
      // let data1= this.savedData[FormServiceService.id]=data
      // let dataarr = [this.savedData]
      // let vall= dataarr.findIndex(element=>{
      //   // if(element.id===FormServiceService.id){
      //   //   this.savedData
      //   // }
      // })
      //   console.log(vall)
      this.closeDialoge(this.savedData);
    } else {
      console.log("create")
      this.savedData = data
      this.closeDialoge(this.savedData);
    }

  }
  closeDialoge(val: any): void {
    this.dialogRef.close(val);
  }

}
