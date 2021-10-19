import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../model/interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos?:Todo[]
  @Output() editTodo:EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() toggleTodo:EventEmitter<Todo> = new EventEmitter<Todo>()

  ngOnInit(): void {
    
  }

  onCheckTodo(todo:Todo):void{

  }
  onSelectTodo(todo:Todo):void{
    
  }

}
