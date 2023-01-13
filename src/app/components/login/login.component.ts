import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  
  constructor(private authService: AuthService, private router: Router) { }
  cancel():void{
    this.router.navigate(['/home']);
  }
  login(loginForm: NgForm): void{
    if (loginForm && loginForm.valid){
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName,password);
    } else {
      this.errorMessage=  'Favor de ingresar email y contraseña';
    }
  }
  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  ngOnInit() {
  }

}
