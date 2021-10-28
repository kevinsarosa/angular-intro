import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../shared/guard/route.guard';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  { path: '', component: DemoComponent },
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'lifecycle',
    loadChildren: () =>
      import('./lifecycle/lifecycle.module').then((m) => m.LifecycleModule),
      canActivate: [RouteGuard]
  },
  {
    path: 'new-todos',
    loadChildren: () =>
      import('./new-todo/new-todo.module').then((m) => m.NewTodoModule),
      canActivate: [RouteGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
