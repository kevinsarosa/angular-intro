import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { HighlightDirective } from './directives/highlight.directive';
import { BsButtonDirective } from './directives/bs-button.directive';

const components = [HeaderComponent, FooterComponent, ValidationMessageComponent]
const directives = [HighlightDirective,  BsButtonDirective]


@NgModule({
  declarations: [
    ...components,
    ...directives,
   
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ...components,
    ...directives
  ]
})
export class SharedModule { }
