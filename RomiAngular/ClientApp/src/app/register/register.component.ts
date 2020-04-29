import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators'; 
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() { 
    this.registerForm = this.formBuilder.group({ 
      emailaddress: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],  
      password: ['', Validators.required]
    });
  }

  get registerControl() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true; 

    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['login'])
        },
        () => {
          this.loading = false;
          this.registerForm.reset();
          this.registerForm.setErrors({
            invalidregistration: true
          });
        });
  }
}
