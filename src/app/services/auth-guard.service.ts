
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate,
  CanActivateChild
} from '@angular/router';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'
import { User } from '../components/login/user';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }
  //canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    //return this.checkLoggedIn(state.url);
  //}
  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      //console.log(this.authService.currentUser.id);  
      return true;
    }
    if(!this.authService.prueba){
      console.log("auth guard "+this.authService.loggedin)
      this.authService.checkSession().subscribe((res)=>{
        console.log("sesion activa "+res)
        if(res){
          this.authService.recovery().subscribe((user: User)=>{
          this.authService.currentUser=user;
          this.authService.loggedin=true;
          console.log(this.authService.currentUser);
          if(url.includes("admin") && !this.authService.currentUser.isAdmin){
           console.log("es de admin");
           this.router.navigate(['/user']);
          }
          else{
          if(url.includes("user") && this.authService.currentUser.isAdmin){
            this.router.navigate(['/admin']);
          }  
          else
          this.router.navigateByUrl(url);
          }
          
          });
          return true;
        }
        else{
          // Retain the attempted URL for redirection
          this.authService.redirectUrl = url;
          this.router.navigate(['/login']);
          return false;
        }
      });
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
export class AdminGuard implements CanActivate,CanActivateChild{
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.authService.isAdmin();
      }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return this.authService.isAdmin();
    }

      checkLoggedInAdmin(url: string): boolean {
        if (this.authService.isAdmin()) {
            return true;
        }
        // Retain the attempted URL for redirection
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
      }
}
