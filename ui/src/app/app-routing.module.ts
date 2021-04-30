import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/common/home/home.component';
import {RegisterComponent} from './components/common/register/register.component';
import {LoginComponent} from './components/common/login/login.component';
import {CartComponent} from './components/cart/cart.component';
import {ProfileComponent} from './components/profile/profile.component';
import {OrderHistoryComponent} from './components/order-history/order-history.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'account-info', component: ProfileComponent},
  {path: 'order-history', component: OrderHistoryComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
