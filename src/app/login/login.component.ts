import { Component } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-login',
  imports : [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private apiUrl = environment.apiUrl;

  constructor(private router: Router) {}

  // Handle form submission
  login(): void {
    const loginRequest = {
      username: this.username,
      password: this.password
    };

    // Make the POST request using Axios
    axios.post(`${this.apiUrl}/api/login`, loginRequest)
      .then(response => {
        if (response.data && response.data.message) {
          // Redirect to dashboard upon successful login
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(error => {
        // Handle error (e.g., show message if login failed)
        this.errorMessage = error.response?.data?.error || 'Invalid username or password';
        console.error('Login failed:', error);
      });
  }
}
