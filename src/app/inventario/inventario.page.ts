import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  formGroup: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.formGroup.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.formGroup.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.formGroup.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.formGroup.value)
    }
  }


}
