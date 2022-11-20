import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken !== null) {
      this.authService.setToken(storedToken);
    }
  }
  title = 'client';
}
