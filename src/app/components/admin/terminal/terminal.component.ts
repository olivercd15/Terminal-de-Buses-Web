import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/interfaces/terminal';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { TerminalService } from 'src/app/services/terminal.service';
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  terminals: {
    id: number,
    name: string,
    city: string,
    state: string,
    num: string,
    street: string,
    col: string,
    tel: string,
    zip: string
  }[];
  newterminal: any;
  name_edit:  boolean[];
  city_edit: boolean[];
  state_edit: boolean[];
  street_edit: boolean[];
  num_edit: boolean[];
  col_edit: boolean[];
  update_change: boolean[];
  addterminaltoggle: boolean;
  constructor(private adminservice: AdminService, private authservice: AuthService,private terminalService: TerminalService) {
    this.name_edit=[false]
    this.city_edit=[false]
    this.state_edit=[false]
    this.street_edit=[false]
    this.num_edit=[false]
    this.col_edit=[false]
    this.update_change=[false]
    this.addterminaltoggle=false
    this.newterminal={
      id:0,
      name:"",
      city:"",
      state:"",
      num:"",
      street:"",
      col:"",
      tel:"",
      zip:""
    }
  }
  toggleadd(){
    this.addterminaltoggle=!this.addterminaltoggle
  }
  addterminal(){
    if(this.authservice.prueba){
      if(this.newterminal.name!="" && this.newterminal.city!=""&& this.newterminal.state!="" && this.newterminal.street!="" && this.newterminal.num!="" && this.newterminal.col!="" && this.newterminal.tel!="" && this.newterminal.zip!="")
      console.log(this.newterminal)
      else
      alert("datos requeridos")
    }
  }
  getterminal(){
    if(!this.authservice.prueba){
      this.terminalService.terminals().subscribe((terminals: any[])=>{
        this.terminals=terminals;
      })
    }
  }
  ngOnInit() {
    if(this.authservice.prueba){
      this.terminals=[{
        id: 1,
        city: "Aguascalientes",
        state: "Aguascalientes",
        name: "Central Autobuses AGS",
        street: "Av convencion",
        num: "122",
        col: "El dorado",
        tel: "9121212",
        zip: "20210"
      }]
    }
    else{
      this.getterminal()
    }
  }

}
