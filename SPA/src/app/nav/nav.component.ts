import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  public login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Login successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public loggedIn() {
    return this.authService.loggedIn();
  }
  public logout() {
    this.authService.logout();
  }
}
