import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../shared/guard/route.guard';
import { DemoComponent } from './demo.component';
import { ShopaaComponent } from './components/shopaa/shopaa.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    children: [
      { path: 'shopaa', component: ShopaaComponent },
      { path: 'todo', component: TodoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
