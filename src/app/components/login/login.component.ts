import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private authService: AuthService, private router: Router,  private snackBar: MatSnackBar) {}

  login(loginForm:NgForm) {
    if (loginForm.valid) {

      this.authService.login(this.email, this.password).subscribe(
        data => {
          this.snackBar.open('Logged In','close',{duration : 3000});
          // console.log('Login successful', data);
          this.router.navigate(['/home']);
        },
        error => {
          this.snackBar.open('Incorrect credentials','Close',{duration:3000});
          console.error('Login error:', error);
        }
      );
    }
  }
}
