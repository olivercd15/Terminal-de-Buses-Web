import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { User } from '../../interfaces/user'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData: User;
  constructor(private registerService: RegisterService, private router: Router, private authService: AuthService) {
    if(!this.authService.loggedin){
      this.authService.logout();
    }
   }

  ngOnInit() {
  }
  register(registerForm: NgForm): void{
    if(registerForm && registerForm.valid){
      this.userData={
        first_name: registerForm.form.value.first_name,
        last_name_p: registerForm.form.value.last_name_p,
        last_name_m: registerForm.form.value.last_name_m,
        email: registerForm.form.value.email,
        password: registerForm.form.value.password,
        tel: registerForm.form.value.tel,
        rfc: registerForm.form.value.rfc,
      };
      console.log(this.userData);
      this.registerService.register(this.userData);
    }
    else{
      console.log("error");
    }
  }

}
