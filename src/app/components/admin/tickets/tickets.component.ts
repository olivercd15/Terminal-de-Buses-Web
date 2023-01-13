import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { TerminalService } from '../../../services/terminal.service';
import { Terminal } from 'src/app/interfaces/terminal';
import { RoutesReport } from 'src/app/interfaces/routes-report';
import { Route } from '@angular/router';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  constructor(private adminService: AdminService, private terminalService: TerminalService) {}
  public date: string;
  public terminals: Terminal[];
  public terminal: Terminal;
  public terminal2: Terminal;
  public year: number;
  public yearMonth: number;
  public month: number;
  public month2: number;
  public month3: number;
  public months: Array<any> = [{id: [], name: []}];
  public ticketsQuantity: number;
  public ticketsQuantity2: number;
  public moneyQuantity: number;
  public moneyQuantity2: number;
  public quantity: number;
  public routes: RoutesReport[];
  public routes2: RoutesReport[];
  public routes3: RoutesReport[];
  public routes4: RoutesReport[];
// variables para grafica de pay
  public pieChartLabels: string[] = ['Estudiantes', 'Con Descuento', 'Normal'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
// Variables para grafica
  public lineChartData: Array<any> = [
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Descuento'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Estudiante'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Normal'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Acumulado'}
];
  public aux: Array<any> = [
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
];
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                                      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                                      'Noviembre', 'Diciembre'];
  public lineChartOptions: any = {
  responsive: true
  };
  public lineChartColors: Array<any> = [
  { // grey
    backgroundColor: 'rgba(66,139,202,0.2)',
    borderColor: 'rgba(66,139,202,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(92,184,92,0.2)',
    borderColor: 'rgba(92,184,92,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // grey
    backgroundColor: 'rgba(217,83,79,0.2)',
    borderColor: 'rgba(217,83,79,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(91,192,222,0.4)',
    borderColor: 'rgba(91,192,222,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];
  public lineChartLegend = true;
  public lineChartType = 'line';
// variables para grafica de barras
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [] ;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {data: [], label: 'Ventas Totales'},
  ];
  public barChartLabels2 = [] ;
  public barChartData2: any[] = [
    {data: [], label: 'Ventas por Terminal'}
  ];
  public barChartLabels3 = [] ;
  public barChartData3: any[] = [
    {data: [], label: 'Ventas por Terminal'}
  ];
// variables para la grafica de dona
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartLabels2: string[] = [];
  public doughnutChartData2: number[] = [];
  public doughnutChartType = 'doughnut';
// funciones para reportes
  public getReport(): void {
    this.adminService.getReport(this.year).subscribe((aux: Array<any>) => {
      let k = 0;
        for (let j = 0; j < this.aux[0].data.length; j++) {
          if (aux[k].month === j + 1) {
            this.aux[0].data[j] = aux[k].discount;
            this.aux[1].data[j] = aux[k].student;
            this.aux[2].data[j] = aux[k].normal;
            this.aux[3].data[j] = aux[k].total;
            k++;
          } else {
            this.aux[0].data[j] = 0;
            this.aux[1].data[j] = 0;
            this.aux[2].data[j] = 0;
            this.aux[3].data[j] = 0;
          }
        }
      this.getValues();
    });
  }
  public getReportMonth(): void {
    this.adminService.getReportMonth(this.yearMonth, this.month).subscribe((array: Array<any>) => {
      this.printData(array);
    });
  }
  public getReportDay(): void {
  this.adminService.getReportDay().subscribe((array: any) => {
    const aux = [];
    aux[0] = array.result2[0].student;
    aux[1] = array.result2[0].discount;
    aux[2] = array.result2[0].normal;
    this.date = array.date;
    this.pieChartData = aux;
  });
  }
  public getReportTerminalD(): void {
  this.adminService.getReportTerminal(this.terminal.id, this.month2).subscribe((array: Array<any>) => {
    this.printDataTerminals(array, 1);
  });
  }
  public getReportDestinysT(): void {
  this.adminService.getReportTerminalD(this.terminal2.id, this.month3).subscribe((array: Array<any>) => {
    this.printDataTerminals(array, 2);
  });
  }
  public getReportRoutesMS(): void {
  this.adminService.getReportRoutesMoreSold().subscribe((array: Array<any>) => {
    this.printDataDonut(array, 1);
  });
  }
  public getReportRoutesLS(): void {
  this.adminService.getReportRoutesLessSold().subscribe((array: Array<any>) => {
    this.printDataDonut(array, 2);
  });
  }
  public getReportTicketsQuantity(): void {
  this.adminService.getReportQuantity(this.ticketsQuantity).subscribe((routes: RoutesReport[]) => {
    this.routes = routes;
  });
  }
  public getReportTicketsQuantity2(): void {
  this.adminService.getReportQuantity2(this.ticketsQuantity2).subscribe((routes: RoutesReport[]) => {
    this.routes2 = routes;
  });
  }
  public getReportMoneyQuantity(): void {
  console.log(this.moneyQuantity);
  this.adminService.getReportMoneyQuantity(this.moneyQuantity).subscribe((routes: RoutesReport[]) => {
    this.routes3 = routes;
  });
  }
  public getReportMoneyQuantity2(): void {
  this.adminService.getReportMoneyQuantity2(this.moneyQuantity2).subscribe((routes: RoutesReport[]) => {
    this.routes4 = routes;
  });
  }
// funciones auxiliares para reportes
  public getValues(): void {
  const _lineChartData: Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = this.aux[i].data[j]; // Aqui se van a modificar valores
    }
  }
  this.lineChartData = _lineChartData;
  }
  public printDataTerminals(array: any, flag: number): void {
    let k = 0;
    const data = [];
    const aux = [];
    for (let i = 0; i < array.terminals; i++) {
      aux[i] = array.result[i].nombre;
      if (array.result2.length > k && array.result[i].id === array.result2[k].id ) {
        data[i] = array.result2[k].total;
        k++;
      } else {
        data[i] = 0;
      }
    }
    if (flag === 1) {
      this.barChartData2[0].data = data;
      this.barChartLabels2 = aux;
    } else if (flag === 2) {
      this.barChartData3[0].data = data;
      this.barChartLabels3 = aux;
    }
  }
  public printDataDonut(array: Array<any> , flag: number): void {
  for (let i = 0; i < array.length; i++) {
    if (flag === 1) {
      this.doughnutChartLabels[i] = array[i].terminal;
      this.doughnutChartData[i] = array[i].total;
    } else if (flag === 2) {
      this.doughnutChartLabels2[i] = array[i].terminal;
      this.doughnutChartData2[i] = array[i].total;
    }
  }
  }
  public printData(array: any): void {
  const aux = [];
  const data = [];
  let k = 0;
  let arrayany: {
    days: number;
    result2: {day: number, total: number}[];
  };
  arrayany = array;
  for (let i = 0; i < arrayany.days; i ++) {
    if ( arrayany.result2.length > k && arrayany.result2[k].day === i + 1) {
      data[i] = arrayany.result2[k].total;
      k++;
    } else {
      data[i] = 0;
    }
    aux[i] = i + 1;
  }
    this.barChartData[0].data = data;
    this.barChartLabels = aux;
  }
  public currentMonth(): void {
  const currentMonth = new Date().getMonth();
  for (let j = 0; j < currentMonth + 1; j++) {
    this.months[0].id[j] = j;
    switch (this.months[0].id[j]) {
      case 0: this.months[0].name[j] = 'Enero'; break;
      case 1: this.months[0].name[j] = 'Febrero';  break;
      case 2: this.months[0].name[j] = 'Marzo'; break;
      case 3: this.months[0].name[j] = 'Abril'; break;
      case 4: this.months[0].name[j] = 'Mayo'; break;
      case 5: this.months[0].name[j] = 'Junio'; break;
      case 6: this.months[0].name[j] = 'Julio'; break;
      case 7: this.months[0].name[j] = 'Agosto'; break;
      case 8: this.months[0].name[j] = 'Septiembre'; break;
      case 9: this.months[0].name[j] = 'Octubre'; break;
      case 10: this.months[0].name[j] = 'Noviembre'; break;
      case 11: this.months[0].name[j] = 'Diciembre'; break;
      default: break;
    }
  }
  }
// eventos
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    for (let q = 0; q < 5; q++) {
    this.doughnutChartData[q] = 0;
    this.doughnutChartLabels[q] = '';
    this.doughnutChartData2[q] = 0;
    this.doughnutChartLabels2[q] = '';
    }
    this.getReportRoutesMS();
    this.getReportRoutesLS();
    this.terminal = {
    id: 0,
    name: '',
    city: '',
    state: '',
    address: '',
    tel: '',
    zip: ''
    };
    this.terminal2 = {
    id: 0,
    name: '',
    city: '',
    state: '',
    address: '',
    tel: '',
    zip: ''
    };
    this.currentMonth();
    for (let i = 0; i < 3 ; i++) {
    this.pieChartData[i] = 0;
    }
    this.getReportDay();
    this.terminalService.getorigins().subscribe((terminals: Terminal[]) => {
      this.terminals = terminals;
    });
    this.ticketsQuantity = 0;
    this.ticketsQuantity2 = 0;
    this.moneyQuantity = 0;
    this.moneyQuantity2 = 0;
    this.quantity = 0;
  }

}
