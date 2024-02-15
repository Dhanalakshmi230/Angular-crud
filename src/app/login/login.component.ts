import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: LoginService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });

    // Get the ID from the route parameters
    const id = this.route.snapshot.params['id'];
    if (id) {
      // If ID is provided, fetch data by ID and populate the form
      this.fetchDataById(id);
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const id = this.route.snapshot.params['id'];

      if (id) {
        // If ID is available, call the update method
        this.service.update(id, formData).subscribe(
          response => {
            console.log('Update successful:', response);
            this.router.navigate(['/table']);
          },
          error => {
            console.error('Update error:', error);
          }
        );
      } else {
        // Otherwise, call the login method
        this.service.login(formData).subscribe(
          response => {
            console.log('Login successful:', response);
            this.router.navigate(['/table']);
          },
          error => {
            console.error('Login error:', error);
          }
        );
      }
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.markFormGroupTouched(this.myForm);
    }
  }

  fetchDataById(id: string): void {
    this.service.getById(id).subscribe(
      response => {
        console.log('Fetched data by ID:', response);
        // Populate the form with the fetched data
        this.myForm.patchValue({
          Firstname: response.Firstname,
          Lastname: response.Lastname,
          Email: response.Email
        });
      },
      error => {
        console.error('Error fetching data by ID:', error);
      }
    );
  }

  // Function to mark all form controls as touched to trigger validation messages
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
