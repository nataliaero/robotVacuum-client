import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Top10Component } from './top10/top10.component';
import { RobotVacuumComponent } from './robot-vacuum/robot-vacuum.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'robot/:id', component: RobotVacuumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'top10', component: Top10Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
