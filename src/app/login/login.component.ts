import { TokenStorage } from './../shared/auths/token.storage';
import { AuthService } from './../shared/auths/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  username: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService,
    private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cool-cars';
    console.log(this.returnUrl);
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        success => {
          console.log("token is " + success.accessToken);
          this.tokenStorage.saveToken(success.accessToken);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error.status == 403) {
            this.error = "Invalid user or password.";
          }
          
          this.loading = false;
        }
      );
  }

  // login() : void {
  //   this.authService.attemptAuth(this.username, this.password).subscribe(
  //     resp => {
  //       console.log("Data: " + resp);
  //       this.token.saveToken(resp.headers.get("Authorization"));
  //       this.router.navigate(['cool-cars']);
  //   });
  // }

}
