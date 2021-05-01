import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { HomeComponent } from './home/home.component';
//import {RouterModule,Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
