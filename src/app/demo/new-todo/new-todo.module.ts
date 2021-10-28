import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewTodoRoutingModule } from './new-todo-routing.module';
import { NewTodoComponent } from './new-todo.component';
import { NewTodoFormComponent } from './components/form/new-todo-form.component';
import { NewTodoListComponent } from './components/list/new-todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTodoService } from './services/new-todo.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NewTodoComponent,
    NewTodoFormComponent,
    NewTodoListComponent
  ],
  imports: [
    CommonModule,
    NewTodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    NewTodoService
  ]
})
export class NewTodoModule { }
