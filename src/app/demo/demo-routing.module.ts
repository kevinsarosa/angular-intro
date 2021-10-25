import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [{ path: '', component: DemoComponent }, { path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) }, { path: 'lifecycle', loadChildren: () => import('./lifecycle/lifecycle.module').then(m => m.LifecycleModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
