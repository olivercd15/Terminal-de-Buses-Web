import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service'
@Component({
  selector: 'app-personaldata',
  templateUrl: './personaldata.component.html',
  styleUrls: ['./personaldata.component.css']
})
export class PersonaldataComponent implements OnInit {
  public flag: boolean;
  public flag2: boolean;
  public flag3: boolean;
  public flag4: boolean;
  public flag5: boolean;
  public countsave: number;
  public changepass: boolean;
  public adminName: string;
  public last_name1: string;
  public last_name2: string;
  public rfc: string;
  public save: string;
  public email: string;
  public cel: string;
  admindata: User;
  curpass: string;
  newpass: string;
  confpass: string;
  checkpass: boolean;
  passconf: boolean;
  constructor( private authService: AuthService, private adminService: AdminService) {
    this.flag = this.flag2 = this.flag3 = this.flag4 = this.flag5 = true;
    this.save = 'Editar';
    this.changepass = false;
    this.adminName = 'Nombre';
    this.last_name1 = 'Paterno';
    this.last_name2 = 'Materno';
    this.rfc = 'CI';
    this.email = 'email@gmail.com';
    this.cel = '123 456 78';
  }
  ngOnInit() {
    if(!this.authService.prueba){
      console.log(this.authService.loggedin);
      this.adminService.getAdminData(this.authService.currentUser.id).subscribe((user: User)=>{
        this.admindata=user;
        this.adminName=this.admindata["first_name"];
        this.last_name1=this.admindata["last_name_p"];
        this.last_name2=this.admindata["last_name_m"];
        this.rfc=this.admindata["rfc"];
        this.email=this.admindata["email"];
        this.cel=this.admindata["tel"];
      });
    }
  }
  get userName(): string | null {
    if (this.authService.isLoggedIn) {
      return this.authService.currentUser.userName;
    } else {
      return null;
    }
  }
  togglePass(): void{
    if(this.changepass)
    this.changepass=false;
    else
    this.changepass=true;
  }
  checkPass(): boolean{
    if(this.changepass){
      this.checkpass=false;
      if(this.authService.prueba){
        console.log(this.curpass);
        if(this.curpass=="hola")this.checkpass=true;
        return this.checkpass;
      }
      else{
      this.adminService.checkPass(this.authService.currentUser.id,this.curpass).subscribe((res: boolean)=>{
        console.log(res);
        this.checkpass=res;
        if(!this.checkpass)
        alert("Contraseña Incorrecta");
        else
        this.updateData();
        return res;
      });
      }
    }
    else{
      this.updateData();
    }
    
    
  }

  confPass(): boolean{
    this.passconf=false;
    if(this.newpass==this.confpass && this.confpass.length>0)
    this.passconf=true;
    return this.passconf;
  }
  updateData(): void{
    if(this.changepass && this.passconf)
    this.admindata={
      first_name:this.adminName,
      last_name_p:this.last_name1,
      last_name_m:this.last_name2,
      rfc:this.rfc,
      email:this.email,
      tel:this.cel,
      password: this.newpass
    }
    else{
    this.admindata={
      first_name:this.adminName,
      last_name_p:this.last_name1,
      last_name_m:this.last_name2,
      rfc:this.rfc,
      email:this.email,
      tel:this.cel,
      password: ""
    }
    if(!this.authService.prueba){
      this.adminService.updateAdminData(this.authService.currentUser.id,this.admindata).subscribe((result: Boolean)=>{
      if(result)
      alert("Datos Actualizados");
      else
      alert("Error al actualizar");
      this.ngOnInit();
      });
    }
    console.log(this.admindata);
    }
  }
}
