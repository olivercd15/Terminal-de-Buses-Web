import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Apiback } from 'src/app/apiback';
import { RoutesReport } from 'src/app/interfaces/routes-report';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private  http: HttpClient) {}

  getAdminData(id: number): Observable<User>{
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    return this.http.post<User>(Apiback.ENDPOINT+'/api/admin/data',null,{headers,withCredentials:true});
  }
  updateAdminData(id: number,user : User): Observable<Boolean>{
    console.log(id,user);
    const headers = new HttpHeaders({
      'id': `${id}`,
      'first_name': `${user.first_name}`,
      'last_name_p': `${user.last_name_p}`,
      'last_name_m': `${user.last_name_m}`,
      'tel': `${user.tel}`,
      'email': `${user.email}`,
      'password': `${user.password}`,
      'rfc': `${user.rfc}`
    });
    return this.http.post<Boolean>(Apiback.ENDPOINT + '/api/admin/update', null, {headers, withCredentials: true});
  }
  getbuses():Observable<any[]>{
    return this.http.post<any[]>(Apiback.ENDPOINT+'/api/admin/getbuses',null,{withCredentials:true});
  }
  updatebus(bus :any):Observable<boolean>{
    const headers = new HttpHeaders({
      'id': `${bus.id}`,
      'model': `${bus.model}`,
      'capacity': `${bus.capacity}`,
      'plate': `${bus.plate}`,
      'type': `${bus.type}`
    })
    return this.http.post<boolean>(Apiback.ENDPOINT+'/api/admin/updatebus',null,{headers,withCredentials:true});
  }
  deletebus(bus : any):Observable<boolean>{
    const headers = new HttpHeaders({
      'id': `${bus.id}`
    })
    return this.http.post<boolean>(Apiback.ENDPOINT+'/api/admin/deletebus',null,{headers,withCredentials:true});
  }
  addbus(bus : any): Observable<boolean>{
    const headers = new HttpHeaders({
      'model': `${bus.model}`,
      'capacity': `${bus.capacity}`,
      'plate': `${bus.plate}`,
      'type': `${bus.type}`
    })
    return this.http.post<boolean>(Apiback.ENDPOINT+'/api/admin/addbus',null,{headers,withCredentials: true});
  }
  checkPass(id: number, pass: string): Observable<boolean>{
    const headers = new HttpHeaders({
      'id': `${id}`,
      'password': `${pass}`
    });
    return this.http.post<boolean>(Apiback.ENDPOINT + '/api/admin/checkpass', null, {headers, withCredentials: true});
  }
  getReport(year: number): Observable< Array<any>> {
    const headers = new HttpHeaders({
      'year': `${year}`
    });
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/year', null, {headers, withCredentials: true});
}
  getReportMonth(year: number, month: number): Observable<Array<any>> {
    const headers = new HttpHeaders({
      'year': `${year}`,
      'month': `${month}`
    });
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/yearMonth', null, {headers, withCredentials: true});
  }
  getReportTerminal(id: number, month: number): Observable<Array<any>> {
    const headers = new HttpHeaders({
      'id': `${id}`,
      'month': `${month}`
    });
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/terminal', null, {headers, withCredentials: true});
  }
  getReportDay(): Observable <Array<any>> {
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/dailySales', null, { withCredentials: true});
  }
  getReportTerminalD(id: number, month: number): Observable<Array<any>> {
    const headers = new HttpHeaders({
      'id': `${id}`,
      'month': `${month}`
    });
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/terminal2', null, {headers, withCredentials: true});
  }
  getReportRoutesMoreSold(): Observable <Array<any>> {
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/masVendidas', null, {withCredentials: true});
  }
  getReportRoutesLessSold(): Observable <Array<any>> {
    return this.http.post<Array<any>>(Apiback.ENDPOINT + '/api/admin/report/menosVendidas', null, {withCredentials: true});
  }
  getReportQuantity(tickets: number): Observable <RoutesReport[]> {
    const headers = new HttpHeaders({
      'boletos': `${tickets}`,
    });
    return this.http.post<RoutesReport[]>(Apiback.ENDPOINT + '/api/admin/report/mayorIgualBoletos', null, {headers, withCredentials: true});
  }
  getReportQuantity2(tickets: number): Observable <RoutesReport[]> {
    const headers = new HttpHeaders({
      'boletos': `${tickets}`,
    });
    return this.http.post<RoutesReport[]>(Apiback.ENDPOINT + '/api/admin/report/menorIgualBoletos', null, {headers, withCredentials: true});
  }
  getReportMoneyQuantity(money: number): Observable <RoutesReport[]> {
    const headers = new HttpHeaders({
      'cantidad': `${money}`,
    });
    return this.http.post<RoutesReport[]>(Apiback.ENDPOINT + '/api/admin/report/mayorIgualCantidad'
    , null, {headers, withCredentials: true});
  }
  getReportMoneyQuantity2(money: number): Observable <RoutesReport[]> {
    const headers = new HttpHeaders({
      'cantidad': `${money}`,
    });
    return this.http.post<RoutesReport[]>(Apiback.ENDPOINT + '/api/admin/report/menorIgualCantidad'
    , null, {headers, withCredentials: true});
  }
}
