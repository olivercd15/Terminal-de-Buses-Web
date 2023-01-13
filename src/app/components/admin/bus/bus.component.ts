import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/interfaces/bus';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service'
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {

public flag: boolean;
model: string;
capacity: number;
plate: string;
type: string;
buses: Bus[];
model_edit:boolean [];
capacity_edit:boolean[];
plate_edit:boolean[];
type_edit:boolean[];
update_change: boolean[];
newbus: Bus;
addbustoggle :boolean;
  constructor(private authService: AuthService, private adminService: AdminService){
    this.capacity_edit=[false]
    this.model_edit=[false]
    this.plate_edit=[false]
    this.type_edit=[false]
    this.update_change=[false]
    this.newbus={
      id:0,
      model:"",
      plate: "",
      capacity: 0,
      type: ""
    }
    this.addbustoggle=false
  }
  toggleadd(){
    this.addbustoggle=!this.addbustoggle
  }
  getbuses(){
    this.adminService.getbuses().subscribe((buses : Bus[])=>{
      this.buses=buses
    })
  }
  updatebus(bus: Bus){
    this.adminService.updatebus(bus).subscribe((res : boolean)=>{
      if(res){
        console.log("actualizado bus ",bus.id)
      }
    })
  }
  deletebus(bus :Bus){
    this.adminService.deletebus(bus).subscribe((res : boolean)=>{
      if(res){
        console.log("bus eliminado ", bus.id)
      }
    })
  }
  addbus(){
    if(this.authService.prueba){
      if(this.newbus.model!="" && this.newbus.capacity>0 && this.newbus.plate!="" && this.newbus.type!="")
      console.log("datos nuevos",this.newbus)
      else
      alert("Requiere todos los datos")
      this.ngOnInit()
    }
    else{
      if(this.newbus.model!="" && this.newbus.capacity>0 && this.newbus.plate!="" && this.newbus.type!=""){
        this.adminService.addbus(this.newbus).subscribe((res : boolean)=>{
          if(res){
            console.log("Autobus añadido")
            this.ngOnInit()
          }
        })
      }
    }
  }
  ngOnInit() {
    if(this.authService.prueba){
      this. buses=[{
        id:1,
        model:"MC1234",
        capacity:20,
        plate:"ACA12344",
        type: "austero"
      },
      {
        id:2,
        model:"MC1234",
        capacity:20,
        plate:"ACA12344",
        type: "austero"
      },
      {
        id:3,
        model:"MC1234",
        capacity:20,
        plate:"ACA12344",
        type: "austero"
      }]
      this.capacity_edit.length=this.buses.length
      this.capacity_edit.forEach(element => {
      element=false;
      });
      this.model_edit.length=this.buses.length
      this.model_edit.forEach(element => {
       element=false;
      });
      this.plate_edit.length=this.buses.length
      this.plate_edit.forEach(element => {
        element=false;
      });
      this.type_edit.length=this.buses.length
      this.type_edit.forEach(element => {
          element=false;
      });
      this.update_change.length=this.buses.length
      this.update_change.forEach(element => {
          element=false;
      });
    }else{
      this.getbuses()
    }
  }

}
