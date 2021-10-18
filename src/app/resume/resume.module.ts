import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResumeRoutingModule } from './resume-routing.module';



@NgModule({
  declarations: [
    ResumeComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule
  ],
  exports:[
    ResumeComponent
  ]
})
export class ResumeModule { }
