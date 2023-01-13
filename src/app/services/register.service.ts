import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router'
import { User } from '../interfaces/user';
import { Apiback } from 'src/app/apiback'
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient, private router: Router) { }
  
  goToDashboard(): void{
    this.router.navigate(['/login']);
  }

  register(user: User): void{
    console.log(user);
    const headers = new HttpHeaders({
      'first_name': `${user.first_name}`,
      'last_name_p': `${user.last_name_p}`,
      'last_name_m': `${user.last_name_m}`,
      'tel': `${user.tel}`,
      'email': `${user.email}`,
      'password': `${user.password}`,
      'rfc': `${user.rfc}`
    });
    // this._http.post<Boolean>(Apiback.ENDPOINT+'/api/user/register/',null,{headers}).subscribe((result: Boolean)=>{
    //     console.log(result);
    //     if(result){
    //       this.router.navigate(['/home']);
    //     }
    //     else{
    //       alert("correo ya registrado");
    //     }
    // }
    // );
    // delay(300);
    
    setTimeout(() => {
      this.goToDashboard()
     }, 1500);

    //this.router.navigate(['/login']);
  }
}
