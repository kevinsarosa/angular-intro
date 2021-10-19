import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Todo } from '../../model/interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

  }
  @Input() todo?: Todo;
  @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  todoForm?:FormGroup

  ngOnInit(): void {}

  onSubmitTodo():void{
    
  }

  
}
