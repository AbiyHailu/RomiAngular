import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators'; 
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
   
  subject: Subject<void> = new Subject();
  loading = false;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  success: string;
  firstNumber: number;
  secondNumber: number; 
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {

    this.firstNumber = Math.floor(Math.random() * 10) + 1;
    this.secondNumber = Math.floor(Math.random() * 10) + 1;
  }

  ngOnInit() { 
    this.registerForm = this.formBuilder.group({ 
      emailaddress: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],  
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    }); 
  }

  get registerControl() { return this.registerForm.controls; }

  result = false
  wronganswer=''
  onKey(incoming: any) { 
    if (+incoming && +incoming === this.firstNumber + this.secondNumber) {
      this.result = true
      this.wronganswer = ''; 
    } else { 
      this.result = false;
      this.wronganswer = 'Please, provide the right answer.' 
    }
  }
   
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid || !this.result) {
      this.onKey(null)
      return;
    }
    this.loading = true;

    this.authService.register(this.registerForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe( 
        data => { 
          this.success = "Successfuly registerd. You can now log in with your credentials."; 
          setTimeout(() => {
            this.router.navigate(['login']); 
            this.success = "";
          }, 4000);
        },
        err => { 
          this.loading = false;
          this.registerForm.reset();
          this.registerForm.setErrors({
            invalidregistration: true
          });
        }
      ) 
  }


    ngOnDestroy(): void {
      this.subject.next();
    }
}
