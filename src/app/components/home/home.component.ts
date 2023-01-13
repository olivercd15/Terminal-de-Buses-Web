import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { User} from '../login/user'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: Boolean =true;
 
  constructor(private authService: AuthService) {
    if(!this.authService.loggedin){
      this.authService.logout();
    }
   }

  ngOnInit() {
  }

}
