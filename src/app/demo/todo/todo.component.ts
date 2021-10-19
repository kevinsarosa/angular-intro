import { Component, OnInit } from '@angular/core';
import { Todo } from './model/interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos?:Todo[]
  todo?:Todo
  constructor() { }

  ngOnInit(): void {
  }

  

  onEditTodo(todo:Todo):void{

  }

  onToggleTodo(todo:Todo):void{

  }

  onSaveTodo(todo:Todo):void{
    
  }


}
