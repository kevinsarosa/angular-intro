import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../model/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

 @Input() todos: Todo[] = []
 @Input() title?:string;
 @Output() todo:EventEmitter<Todo> = new EventEmitter<Todo>()
 @Output() viewTodo: EventEmitter<string>= new EventEmitter<string>()


 checkedTodo?: Todo;

  pageTitle = 'TODO LIST'

  ngOnInit(): void {
  }

  handleCheckedTodo(event:any, todo: Todo):void{
    // this.todo?.emit(todo)
    // this.viewTodo?.emit(todo.isDone ? `${todo.name} (sudah selesai)` : `${todo.name} (belom selesai)`)

    console.log('id:', event.target?.value, 'isDone:', event.target.checked);

    todo.isDone = event.target.checked;
    this.todo.emit(todo)
  }

}
