import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService} from 'src/app/services/auth.service';
import { ticket } from 'src/app/interfaces/ticket';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  purchases: any [];
  constructor(private userservice: UserService,private authService: AuthService) {
   }
  ngOnInit() { 
    if(this.authService.prueba){
      this.purchases=[{
        id: 1,
        folio:1,
        total:300.50,
        subtotal:255.50,
        origen:"AGS",
        destino:"CAL",
        horario:"",
        fecha:"2018-10-09",
        titular:"Alexander Esquivel",
        numero:"XXXX-XXXX-XXXX-1234"
      }];
    } else {
      this.userservice.getpurchases(this.authService.currentUser.id).subscribe((purchases: any[]) => {
        this.purchases = purchases;
      });
    }
  }
}