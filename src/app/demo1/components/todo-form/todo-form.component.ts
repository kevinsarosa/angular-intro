import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  todos: Todo[] = []
  placeHolder = 'Todo Name'
  pageTitle = 'TODO FORM'

  isDone = false
  ngOnInit(): void {
  }


  toggleDone(target:any):void{
    this.isDone = target.checked
  }

  todo = '?';

  todoForm: FormGroup = new FormGroup({
    todoInput: new FormControl(null)
  })

  addTodo():void{
    console.log('Todo: ', this.todoForm.value);
    
  }

}
