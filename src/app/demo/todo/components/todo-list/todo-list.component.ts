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
  @Output() toggleTodo:EventEmitter<void> = new EventEmitter<void>()

  ngOnInit(): void {
    
  }

  onCheckTodo(todo:Todo):void{
    todo.isDone = !todo.isDone;
    this.toggleTodo.emit()
  }
  onSelectTodo(todo:Todo):void{
    this.editTodo.emit(todo)
  }
  onDeleteTodo(todo: Todo):void{
    const findId = this.todos?.find((e)=>e.id == todo.id)

    if(findId){
      const index= this.todos?.indexOf(todo)
      this.todos?.splice(index!, 1)
      sessionStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }

}
