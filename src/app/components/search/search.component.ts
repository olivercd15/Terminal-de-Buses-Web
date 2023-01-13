import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService} from 'src/app/services/terminal.service';
import { Schedule } from 'src/app/interfaces/schedule';
import { TabHeadingDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terminals: Terminal[];
  destinations: Terminal[];
  times: Schedule[];
  origin: Terminal;
  destination: Terminal;
  search_valid: boolean;
  origsel: boolean;
  destsel: boolean;
  prueba: boolean;
  constructor(private terminalservice: TerminalService) {
    this.origsel=false;
    this.destsel=false;
    this.search_valid=false;
    this.prueba=true;
    if(this.prueba){
      this.terminals=[{
        id: 1,
        city: "Santa Cruz",
        name: "Terminal Bimodal",
        address: "Av. Montes, 3er anillo interno",
        tel: "3488382",
        zip: "591",
        state:"SCZ"
      }];
      this.destinations=[{
        id: 3,
        city: "Cochabamba",
        name: "Terminal",
        address: "Av ags 123 Col. Las americas",
        tel: "4488382",
        zip: "591",
        state: "CBBA"
      },
      {
        id: 4,
        city: "La Paz",
        name: "Terminal de Buses La Paz",
        address: "Av. Uruguay (final) esq. Av. Perú",
        tel: "2488382",
        zip: "591",
        state:"LPZ"
      }]
      this.times=[{
        id: 1,
        time: "18:20",
        cost:120.00,
        iva:0.16,
        tipoBus: "Normal"
      },
      {
        id:2,
        time:"20:30",
        cost:145.50,
        iva:0.16,
        tipoBus: "Semi cama"
      },
      {
        id:3,
        time:"22:00",
        cost:200.00,
        iva:0.16,
        tipoBus: "Bus cama"
      }]
    }
   }
  
  ngOnInit() {
    if(!this.prueba)
    this.checkOrig();
  }
  search(searchForm: NgForm): void{
    if(!this.prueba)
    if (searchForm && searchForm.valid){
      const origen = this.origin.id
      const destino = this.destination.id;
      console.log(this.origin.name+"\n"+this.destination.name+"\n");
      //this.router.navigate(['/user/ticket/select']);
      this.checkHora()
      this.search_valid=true;
      
    } else {
      console.log("error");
    }
    else
    this.search_valid=true;
  }
  nueva(){
    this.search_valid=false
  }
  checkOrig(){
    if(!this.prueba)
    this.terminalservice.getorigins().subscribe((origins: Terminal[])=>{
      this.terminals=origins;
    });
    
  }
  checkDest(){
    this.origsel=true;
    console.log(this.origin);
    if(!this.prueba)
    this.terminalservice.getdestinations(this.origin.id).subscribe((destinations: Terminal[])=>{
      this.destinations=destinations;
    });
    
  }
  checkHora(){
    this.destsel=true;
    this.terminalservice.getschedules(this.origin.id,this.destination.id).subscribe((times: Schedule[])=>{
      this.times=times;
    });
  }
}
