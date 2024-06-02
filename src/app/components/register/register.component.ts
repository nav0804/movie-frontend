import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Register } from '../../classes/register';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  // private registerDto = new Register();

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }


  register(signupForm : NgForm) {
    if (signupForm.valid) {
      const registerDto: Register = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.authService.register(registerDto).subscribe(
        data => {
          this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error:', error);
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
    }
  }
}
