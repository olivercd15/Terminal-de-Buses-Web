
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent} from './shell/shell.component';
import {HomeComponent} from './components/home/home.component';
import {DirectoryComponent} from './components/directory/directory.component';
import {SearchComponent} from './components/search/search.component';
import {UserComponent} from './components/user/user.component';
import {PersonalComponent} from './components/user/personal/personal.component';
import {ReportComponent} from './components/user/report/report.component';
import {CreditComponent} from './components/user/credit/credit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, AdminGuard} from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { BusComponent } from './components/admin/bus/bus.component';
import { TicketComponent } from './components/user/ticket/ticket.component';
import { SearchTicketComponent } from './components/user/ticket/search-ticket/search-ticket.component';
import { TicketsComponent } from './components/admin/tickets/tickets.component';
import { PersonaldataComponent } from './components/admin/personaldata/personaldata.component';
import { EditCardComponent } from './components/user/edit-card/edit-card.component';
import { TerminalComponent } from './components/admin/terminal/terminal.component';
const routes: Routes = [
  {path: '', component: ShellComponent, children: [
  { path: 'home', component: HomeComponent },
  { path: 'directory', component: DirectoryComponent},
  { path: 'search', component: SearchComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'user', canActivate: [AuthGuard], component: UserComponent,
    children: [
      { path: 'ticket', component: TicketComponent, children: [
        {path: 'search', component: SearchTicketComponent},
        {path: '', redirectTo: 'search', pathMatch: 'full'}
      ]},
      { path: 'personal' , component: PersonalComponent},
      { path: 'report' , component: ReportComponent},
      { path: 'cards' , component: CreditComponent, children: [
        { path: 'editcards' , component: EditCardComponent},
      ]},
      { path: '' , redirectTo: 'ticket', pathMatch: 'full'}
    ]
  },
  {
    path: 'admin', canActivate: [AuthGuard], component: AdminComponent,
    children: [
      {path: 'bus', component: BusComponent},
      {path: 'tickets' , component: TicketsComponent},
      {path: 'terminal', component: TerminalComponent},
      {path: 'personal' , component: PersonaldataComponent},
      {path: '' , redirectTo: 'personal', pathMatch: 'full'}
    ]
  }
  ]
  },
  { path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
