import { AuthService } from './../shared/auths/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { MatDialog } from '@angular/material';
import { TokenStorage } from '../shared/auths/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, 
    //public dialog: MatDialog,
    private authService: AuthService,
    private token: TokenStorage) { }

  ngOnInit() {
  }

  login() : void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.headers.get("Authorization"));
        this.router.navigate(['cool-cars']);
      }
    );
  }

}
