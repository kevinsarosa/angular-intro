import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertMessage } from 'src/app/shared/models/alert-message-interface';
import { Todo } from '../../model/interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos?:Todo[]
  message?: AlertMessage;
/*   @Output() editTodo:EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() toggleTodo:EventEmitter<void> = new EventEmitter<void>() */

  constructor(private readonly todoService: TodoService){

  }
  ngOnInit(): void {
    this.getAllTodo()
  }

  getAllTodo():void{
    this.todos = this.todoService.getAll()
  }

  onCheckTodo(todo:Todo):void{
    // todo.isDone = !todo.isDone;
    // this.toggleTodo.emit()
    this.todoService.checkedTodo(todo)
  }
  onSelectTodo(todo:Todo):void{
  //   this.editTodo.emit(todo)
  }
  onDeleteTodo(todo: Todo):void{
  //   const findId = this.todos?.find((e)=>e.id == todo.id)

  //   if(findId){
  //     const index= this.todos?.indexOf(todo)
  //     this.todos?.splice(index!, 1)
  //     sessionStorage.setItem('todos', JSON.stringify(this.todos))
  //   }

  this.message= {
    status: 'danger',
    text:`${todo.name} berhasil di delete`
  }
  setTimeout(()=>{
    this.message = undefined
  },2000)
  this.todoService.deleteTodo(todo.id)
  }

}
