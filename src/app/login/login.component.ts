import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private userAuthService: UserAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        //not supposed to be seen on the web hence commenting them out
        // console.log(response.jwtToken);
        // console.log(response.user.roles);

        //storing the user token and roles in local storage
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.roles);

        //redirecting to different pages
        const roles = response.user.roles[0].roleName;
        if(roles === 'admin'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
