import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Todo } from '../../model/interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if(this.todo){
      this.todoForm?.setValue(this.todo)
    }

  }
  @Input() todo?: Todo;
  @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();


  todoForm:FormGroup = new FormGroup({
    id:new FormControl(),
    name: new FormControl(),
    isDone: new FormControl(false)
  })

  ngOnInit(): void {}

  onSubmitTodo():void{
    this.saveTodo.emit(this.todoForm.value)
    this.todoForm.reset()
    this.todoForm.get('isDone')?.setValue(false)
  }

  
}
