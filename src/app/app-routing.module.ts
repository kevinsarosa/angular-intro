import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleComponent } from './sample/sample/sample.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./resume/resume.module').then((module) => module.ResumeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((module) => module.PagesModule),
  },
  {
    path: 'sample',
    component: SampleComponent,
  },
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pages/demo.module').then((module) => module.DemoModule),
  // },

  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./demo1/demo.module').then((module) => module.DemoModule),
  // },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
