import { Injectable, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { User } from '../components/login/user';
import { Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { Apiback } from 'src/app/apiback';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  loggedin = false;
  redirectUrl: string;
  prueba: boolean=true;
  constructor(private _http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    return this.loggedin;
  }
  isAdmin(): boolean {
      return this.currentUser.isAdmin;
  }
  login(userName: string, password: string): void {
    if(this.prueba){
      this.currentUser = {
        id: 2,
        userName: userName,
        isAdmin: false
      };
      this.loggedin=true;
      console.log(this.isAdmin());
      if (this.isAdmin()){
        if(this.redirectUrl){
          this.router.navigateByUrl(this.redirectUrl);
        }else{
          this.router.navigate(['/admin']);
        }
      } else {
          
          this.router.navigate(['/user']);
        }
      
    }
    else{
    this.validation(userName,password).subscribe((user: User )=>{
      this.currentUser=user;
      //this.currentUser.id=user.id;
      //this.currentUser.userName=user.userName;
      //this.currentUser.isAdmin=user.isAdmin;
      if( user.id!=null){
        this.loggedin=true;
        console.log(this.currentUser);
        if (this.isAdmin()){
          console.log(this.isAdmin());
          this.router.navigate(['/admin']);
        } else {
            console.log(this.isAdmin());
            this.router.navigate(['/user']);
          }
          
      }else{
        alert("correo o contraseña invalidos");
        this.loggedin=false;
      }
      
    }
    );
  }
  }
  logout(): void {
    this.endsession().subscribe((res :boolean)=>{
    });
    this.loggedin=false;
    this.currentUser = null;
  }
  validation(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'email': `${email}`,
      'password': `${password}`
    });
    return this._http.post<User>(Apiback.ENDPOINT+'/api/login/',null,{headers,withCredentials:true});
  }
  checkSession(): Observable<boolean>{
    return this._http.post<boolean>(Apiback.ENDPOINT+'/api/logged/',null,{withCredentials:true});
  }
  endsession(): Observable<boolean> {
   
    return this._http.post<boolean>(Apiback.ENDPOINT+'/api/logout/',null,{withCredentials:true});
  }
  recovery(): Observable<User> {
    return this._http.post<User>(Apiback.ENDPOINT+'/api/recover/',null,{withCredentials:true});
  }
}