import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { AuthService } from '../auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  username: string = undefined;
  subscription: Subscription;

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUsername()
      .subscribe(name => {
        console.log('name ', name);
        this.username = name;
        console.log('this.username ', this.username)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50rem';
    dialogConfig.height = '40rem';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}
