import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
terminals: Terminal[];
total: any;
numpag: any;
curpag: any;
  constructor(private authService: AuthService, private termService: TerminalService) {
    if (!this.authService.loggedin && !this.authService.prueba){
      this.authService.logout();
    }
    this.curpag = 1;
    if (!this.authService.prueba) {
      console.log('hola');
      this.termService.gettotalterm().subscribe((res: number ) => {
        this.total = res[0].total;
        console.log(res);
      });
    } else {
      this.numpag = 3;
    }

  }
  ngOnInit() {
    if(this.authService.prueba){
      this.total=25;
      if(this.curpag==1)
      this.terminals=[{
        id: 1,
        city: 'Santa Cruz',
        name: "BUS NORMAL",
        address: "Asientos de 3 filas",
        tel: "Corta reclinación",
        zip: "Servicio de calefacción",
        state:"TV Antena"
      },
      {
        id: 2,
        city: "Santa Cruz",
        name: "BUS SEMICAMA",
        address: "Asientos de 4 filas",
        tel: "Reclinación media",
        zip: "Servicio de calefacción",
        state:"TV/DVD."
      },
      {
        id: 3,
        city: "Santa Cruz",
        name: "BUS CAMA",
        address: "Asientos de 4 filas de dos pisos",
        tel: "Reclinación alta tipo cama",
        zip: "Calefacción y aire acondicionado",
        state:"TV/DVD y WIFI"
      }];
      else
      this.terminals=[{
        id: 1,
        city: "Culiacan",
        name: "Central Camionera CUL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"CUL"
      },
      {
        id: 2,
        city: "Chiapas",
        name: "Central Camionera CHI",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"CHI"
      }];
    } else {
      this.termService.getterminals(this.curpag).subscribe((terminals: Terminal[]) => {
        this.terminals = terminals;
      });
    }
  }
  pageChanged(event: any): void {
    this.curpag = event.page;
    console.log(this.curpag);
    this.ngOnInit();
  }

}
