import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container/card-container.component';
import { ContentComponent } from './content/content.component';
import { HighlightCardComponent } from './highlight-card/highlight-card.component';
import { LinkComponent } from './link/link.component';
import { NextStepComponent } from './next-step/next-step.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [
    HighlightCardComponent,
    CardContainerComponent,
    NextStepComponent,
    LinkComponent,
    ContentComponent,
    SampleComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SampleComponent
  ]
})
export class SampleModule { }
