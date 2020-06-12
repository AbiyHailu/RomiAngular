import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'], 
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {
    if (localStorage.getItem('authToken')) {
      this.authService.setUserDetails();
    }
  }
}
