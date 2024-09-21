import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,ReactiveFormsModule,NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  
  form: FormGroup;
  showModal = false;

  constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
       name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      phoneNumbers: this.fb.array([]),
    }, { validators: this.passwordMatchValidator });
  }


  onSubmit() {
    if (this.form.valid) {
      this.showModal = true; 
    }
  }

  confirm() {
   this.form.reset({
      name: '',
       email: '',
       password: '',
      confirmPassword: '',
      phoneNumbers: [] });
    this.showModal = false; 
  }


  passwordValidator(control: any) {
    const value = control.value;
    const valid = value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
    return valid ? null : { invalidPassword: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get phoneNumbers() {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.fb.control('', [Validators.required, this.phoneNumberValidator]));
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index); }

  phoneNumberValidator(control: any) {
    const regex = /^\d{10}$/;
    return regex.test(control.value) ? null : { invalidPhoneNumber: true } }
 
}
