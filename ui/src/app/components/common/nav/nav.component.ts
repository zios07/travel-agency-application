import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {User} from 'src/app/models/User';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  loginPage = true;
  connectedRole = null;
  connectedUser: User = null;
  authenticated = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.authenticated = this.authService.isAuthenticated();
        this.authService.getConnectedUser().then(user => {
          this.connectedUser = user;
          if (this.authenticated) {
            this.connectedRole = this.connectedUser.role;
          }
        });
      }
    });
    this.initMenu();
  }

  initMenu() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (this.router.routerState.snapshot.url === '/signup') {
          this.loginPage = false;
        } else {
          this.loginPage = true;
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
