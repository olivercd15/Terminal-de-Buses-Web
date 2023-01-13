import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any; // para jquery
@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  public flagToggle =  true;
  name: string;
  cardnum: string;
  expmonth: number;
  expyear: number;
  cvc: number;
  company: string;
  type: number;
  alert: boolean;
  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.alert = false;
  }
  addCard(cardform: NgForm) {
    if (!this.authService.prueba) {
      console.log(this.cardnum);
    if (cardform && cardform.valid) {
      this.userService.addcard(this.name,this.type,this.company,this.authService.currentUser.id,this.expmonth,this.expyear,this.cardnum,this.cvc).subscribe((res:boolean)=>{
        if (res) {
         this.alert = true;
        }
      });
    }
  } else {
    this.alert = true;
  }
  }
  format(event: KeyboardEvent) {
    if (event.key !== 'Backspace') {
      if (this.cardnum.length === 4 || this.cardnum.length === 9 || this.cardnum.length === 14) {
        this.cardnum += '-';
    }
    }
  }

}
